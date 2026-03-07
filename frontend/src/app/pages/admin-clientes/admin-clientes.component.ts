import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CadeteService, Cadete } from '../../services/cadete.service';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private cadeteService = inject(CadeteService);
  private pedidoService = inject(PedidoService);
  private notifyService = inject(NotificationService);
  private fb = inject(FormBuilder);

  clientes: Cliente[] = [];
  cadetes: Cadete[] = [];
  
  isLoading: boolean = false;
  searchTerm: string = '';

  showModal: boolean = false;
  isEditing: boolean = false;
  editingId: number | null = null;
  clienteForm: FormGroup;

  // Historial
  showHistoryModal: boolean = false;
  historyPedidos: Pedido[] = [];
  historyCliente: Cliente | null = null;

  constructor() {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
      piso: [''],
      departamento: [''],
      zona: [''],
      observaciones: [''],
      cadete: [null]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.loadClientes();
    this.loadCadetes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (res) => {
        this.clientes = res.filter(u => u.rol !== 'ADMIN' && u.activo !== false);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadCadetes() {
    this.cadeteService.getCadetes().subscribe({
      next: (res) => this.cadetes = res.filter(c => c.activo),
      error: (err) => console.error(err)
    });
  }

  get filteredClientes() {
    if (!this.searchTerm) return this.clientes;
    const term = this.searchTerm.toLowerCase();
    return this.clientes.filter(c => 
      c.nombre.toLowerCase().includes(term) || 
      c.apellido.toLowerCase().includes(term) || 
      c.telefono.includes(term) ||
      (c.direccion && c.direccion.toLowerCase().includes(term)) ||
      (c.zona && c.zona.toLowerCase().includes(term))
    );
  }

  openModal(cliente?: Cliente) {
    if (cliente) {
      this.isEditing = true;
      this.editingId = cliente.id || null;
      this.clienteForm.patchValue({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        piso: cliente.piso,
        departamento: cliente.departamento,
        zona: cliente.zona,
        observaciones: cliente.observaciones
      });
      
      if (cliente.cadete) {
        // Encontrar la misma referencia de cadete en nuestro arreglo (para que el html select lo amarre bien)
        const found = this.cadetes.find(c => c.id === cliente.cadete?.id);
        this.clienteForm.patchValue({ cadete: found || null });
      } else {
        this.clienteForm.patchValue({ cadete: null });
      }
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.clienteForm.reset({ cadete: null });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCliente() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formData = this.clienteForm.value;
    const clienteData: Cliente = {
      ...formData,
      rol: 'USUARIO',
      activo: true
    };

    const obs = this.isEditing && this.editingId
      ? this.clienteService.updateCliente(this.editingId, clienteData)
      : this.clienteService.createCliente(clienteData);

    obs.subscribe({
      next: () => {
        this.notifyService.toastSuccess(this.isEditing ? 'Cliente actualizado' : 'Cliente creado');
        this.loadClientes();
        this.closeModal();
      },
      error: (err) => {
        const msg = err.error?.message || err.message || 'Error desconocido';
        this.notifyService.error('Error', msg);
      }
    });
  }

  // --- Historial Methods ---
  openHistory(cliente: Cliente) {
    this.historyCliente = cliente;
    this.showHistoryModal = true;
    this.loadHistory();
  }

  closeHistory() {
    this.showHistoryModal = false;
    this.historyPedidos = [];
    this.historyCliente = null;
  }

  loadHistory() {
    if (!this.historyCliente?.id) return;
    this.pedidoService.getPedidosByCliente(this.historyCliente.id).subscribe({
      next: (res) => this.historyPedidos = res,
      error: (err) => console.error(err)
    });
  }

  async deleteDeliveredHistory() {
    if (!this.historyCliente?.id) return;
    
    const confirm = await this.notifyService.confirm(
      '¿Eliminar Entregados?',
      "Se eliminarán TODOS los pedidos con estado 'ENTREGADO' de este cliente. Esta acción no se puede deshacer.",
      'Sí, eliminar',
      true
    );

    if (confirm) {
      this.pedidoService.deletePedidosEntregadosByCliente(this.historyCliente!.id!).subscribe({
        next: (count) => {
          this.notifyService.toastSuccess(`Se eliminaron ${count} pedidos entregados.`);
          this.loadHistory();
        },
        error: () => this.notifyService.error('Error', 'Error al eliminar historial.')
      });
    }
  }

  async clearAllHistory() {
    if (!this.historyCliente?.id) return;
    
    const confirm = await this.notifyService.confirm(
      '¿Limpiar Todo el Historial?',
      "Se eliminarán ABSOLUTAMENTE TODOS los pedidos de este cliente. ¡Cuidado!",
      'Sí, BORRAR TODO',
      true
    );

    if (confirm) {
      this.pedidoService.deleteAllPedidosByCliente(this.historyCliente!.id!).subscribe({
        next: (count) => {
          this.notifyService.toastSuccess(`Historial vaciado. ${count} pedidos eliminados.`);
          this.loadHistory();
        },
        error: () => this.notifyService.error('Error', 'Error al vaciar historial.')
      });
    }
  }

  printFicha(cliente: Cliente) {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const html = `
        <html>
        <head>
          <title>Ficha de Cliente - ${cliente.nombre} ${cliente.apellido}</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 1.6cm; }
            }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.4; }
            .header { text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #222; font-size: 24px; }
            .row { margin-bottom: 15px; font-size: 1.2rem; border-bottom: 1px dotted #ccc; padding-bottom: 8px; }
            .label { font-weight: bold; width: 160px; display: inline-block; color: #555; }
            .zone-tag { 
              border: 2px solid #edb110; 
              padding: 4px 12px; 
              font-size: 1.1rem; 
              font-weight: bold; 
              border-radius: 4px;
              color: #000;
              text-transform: uppercase;
              background-color: rgba(237, 177, 16, 0.2);
            }
          </style>
        </head>
        <body>
          <div class="header"><h1>Ficha de Entrega - MANOPLAS</h1></div>
          <div class="row"><span class="label">Cliente:</span> ${cliente.nombre} ${cliente.apellido}</div>
          <div class="row"><span class="label">Teléfono:</span> ${cliente.telefono}</div>
          <div class="row"><span class="label">Dirección:</span> ${cliente.direccion || '-'}</div>
          ${(cliente.piso || cliente.departamento) ? `<div class="row"><span class="label">Piso/Depto:</span> ${cliente.piso || ''} ${cliente.departamento || ''}</div>` : ''}
          <div class="row"><span class="label">Zona:</span> <span class="zone-tag">${cliente.zona || 'SIN ZONA'}</span></div>
          <div class="row"><span class="label">Observaciones:</span> ${cliente.observaciones || 'Ninguna'}</div>
          <div class="row"><span class="label">Cadete Asignado:</span> <strong>${cliente.cadete ? cliente.cadete.nombre : 'NO ASIGNADO'}</strong></div>
        </body>
        </html>
      `;
      printWindow.document.write(html);
      printWindow.document.close();
      
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        // Nota: no cerramos la pestaña automáticamente para soportar diferentes browsers y flujos de UI.
      };
    }
  }

  async deleteCliente(id: number) {
    const confirm = await this.notifyService.confirm(
      '¿Eliminar Cliente?',
      'Esta acción no se puede deshacer.',
      'Sí, eliminar',
      true
    );

    if (confirm) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.notifyService.toastSuccess('Cliente eliminado');
          this.clientes = this.clientes.filter(c => c.id !== id);
          this.loadClientes(); // Recargar base
        },
        error: (err) => {
          this.notifyService.error('Error', 'Algo falló: ' + (err.error?.message || err.statusText));
        }
      });
    }
  }
}
