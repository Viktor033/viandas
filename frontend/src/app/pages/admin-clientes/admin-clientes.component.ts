import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CadeteService, Cadete } from '../../services/cadete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent {
  private clienteService = inject(ClienteService);
  private cadeteService = inject(CadeteService);

  clientes: Cliente[] = [];
  cadetes: Cadete[] = [];

  showModal: boolean = false;
  isEditing: boolean = false;

  currentCliente: Cliente = this.getEmptyCliente();

  ngOnInit() {
    this.loadClientes();
    this.loadCadetes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (res) => this.clientes = res.filter(u => u.rol !== 'ADMIN'), // Ocultar admin
      error: (err) => console.error(err)
    });
  }

  loadCadetes() {
    this.cadeteService.getCadetes().subscribe({
      next: (res) => this.cadetes = res.filter(c => c.activo),
      error: (err) => console.error(err)
    });
  }

  openModal(cliente?: Cliente) {
    if (cliente) {
      this.isEditing = true;
      this.currentCliente = JSON.parse(JSON.stringify(cliente)); // Deep copy simple
      // Asegurar referencia de cadete para selected option
      if (this.currentCliente.cadete) {
        const found = this.cadetes.find(c => c.id === this.currentCliente.cadete?.id);
        if (found) this.currentCliente.cadete = found;
      }
    } else {
      this.isEditing = false;
      this.currentCliente = this.getEmptyCliente();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCliente() {
    const obs = this.isEditing && this.currentCliente.id
      ? this.clienteService.updateCliente(this.currentCliente.id, this.currentCliente)
      : this.clienteService.createCliente(this.currentCliente);

    obs.subscribe({
      next: () => {
        this.showSuccess(this.isEditing ? 'Cliente actualizado' : 'Cliente creado');
        this.loadClientes();
        this.closeModal();
      },
      error: (err) => {
        const msg = err.error?.message || err.message || 'Error desconocido';
        this.showError(`Error: ${msg}`);
      }
    });
  }

  printFicha(cliente: Cliente) {
    // Generate simple print view
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Ficha de Cliente</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
      printWindow.document.write('.header { text-align: center; border-bottom: 2px solid #333; margin-bottom: 20px; }');
      printWindow.document.write('.row { margin-bottom: 15px; font-size: 1.2rem; }');
      printWindow.document.write('.label { font-weight: bold; width: 150px; display: inline-block; }');
      printWindow.document.write('.zone-tag { border: 2px solid black; padding: 5px 10px; font-size: 1.5rem; font-weight: bold; }');
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');

      printWindow.document.write('<div class="header"><h1>Ficha de Entrega - MANOPLAS</h1></div>');
      printWindow.document.write(`<div class="row"><span class="label">Cliente:</span> ${cliente.nombre} ${cliente.apellido}</div>`);
      printWindow.document.write(`<div class="row"><span class="label">Teléfono:</span> ${cliente.telefono}</div>`);
      printWindow.document.write(`<div class="row"><span class="label">Dirección:</span> ${cliente.direccion || '-'}</div>`);
      if (cliente.piso || cliente.departamento) {
        printWindow.document.write(`<div class="row"><span class="label">Piso/Depto:</span> ${cliente.piso || ''} ${cliente.departamento || ''}</div>`);
      }
      printWindow.document.write(`<div class="row"><span class="label">Zona:</span> <span class="zone-tag">${cliente.zona || 'SIN ZONA'}</span></div>`);
      printWindow.document.write(`<div class="row"><span class="label">Observaciones:</span> ${cliente.observaciones || 'Ninguna'}</div>`);
      printWindow.document.write(`<div class="row"><span class="label">Cadete Asignado:</span> ${cliente.cadete ? cliente.cadete.nombre : 'NO ASIGNADO'}</div>`);

      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  getEmptyCliente(): Cliente {
    return {
      nombre: '',
      apellido: '',
      telefono: '',
      rol: 'USUARIO',
      activo: true,
      zona: '',
      direccion: '',
      piso: '',
      departamento: '',
      observaciones: ''
    };
  }

  private showSuccess(msg: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: msg,
      timer: 1500,
      showConfirmButton: false,
      background: '#1a1a1a',
      color: '#f8edda'
    });
  }

  private showError(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
      background: '#1a1a1a',
      color: '#f8edda'
    });
  }
}
