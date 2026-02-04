
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService, Pedido, ReporteVentas, ReporteDiario, ReporteDiarioCompleto } from '../../services/pedido.service';
import { CadeteService, Cadete } from '../../services/cadete.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';

// Interfaz para agrupar pedidos por cadete
interface InformeCadete {
  cadete: Cadete;
  pedidos: Pedido[];
}

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.scss'
})
export class AdminPedidosComponent {
  private pedidoService = inject(PedidoService);
  private cadeteService = inject(CadeteService);
  private cd = inject(ChangeDetectorRef);

  pedidos: Pedido[] = [];
  cadetes: Cadete[] = [];
  estadosPosibles = ['PENDIENTE', 'EN_PREPARACION', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO'];
  selectedPedido: Pedido | null = null;

  // Variables para impresión
  modoImpresion = false;
  informesCadetes: InformeCadete[] = [];
  fechaImpresion = new Date();

  ngOnInit() {
    this.loadPedidos();
    this.loadCadetes();
  }

  loadPedidos() {
    this.pedidoService.getAllPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  loadCadetes() {
    this.cadeteService.getCadetes().subscribe(data => {
      this.cadetes = data;
    });
  }

  verDetalles(pedido: Pedido) {
    this.selectedPedido = pedido;
  }

  closeModal() {
    this.selectedPedido = null;
  }

  cambiarEstado(pedido: Pedido, event: any) {
    const nuevoEstado = event.target.value;
    this.pedidoService.updateEstado(pedido.id, nuevoEstado).subscribe({
      next: (res) => {
        pedido.estado = res.estado;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#1a1a1a',
          color: '#f8edda'
        });
        Toast.fire({
          icon: 'success',
          title: `Estado actualizado a ${res.estado}`
        });
      },
      error: (err) => {
        console.error(err);
        const errorMessage = typeof err.error === 'string' ? err.error : (err.error?.message || 'No se pudo actualizar el estado');
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          background: '#1a1a1a',
          color: '#f8edda',
          confirmButtonColor: '#edb110'
        });
        this.loadPedidos();
      }
    });
  }

  // Generar informes de reparto para impresión
  generarInformes() {
    // Preparar opciones para el select (Todos + Cadetes)
    const options: { [key: string]: string } = {
      'all': 'Todos los Cadetes'
    };

    this.cadetes.forEach(c => {
      options[c.id!.toString()] = `${c.nombre} ${c.apellido} (${c.vehiculo})`;
    });

    Swal.fire({
      title: 'Seleccionar Cadete',
      text: '¿Para quién deseas generar el informe?',
      input: 'select',
      inputOptions: options,
      inputValue: 'all',
      showCancelButton: true,
      confirmButtonText: 'Generar',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#f8edda',
      confirmButtonColor: '#edb110'
    }).then((result) => {
      if (result.isConfirmed) {
        this.procesarInformes(result.value);
      }
    });
  }

  procesarInformes(cadeteIdSeleccionado: string) {
    this.informesCadetes = [];

    // Agrupar pedidos por cadete
    const pedidosPorCadete = new Map<number, Pedido[]>();

    this.pedidos.forEach(pedido => {
      // Solo incluir pedidos en preparación o en camino
      if (pedido.estado === 'EN_PREPARACION' || pedido.estado === 'EN_CAMINO') {
        const cadeteId = pedido.usuario?.cadete?.id;

        if (cadeteId) {
          // Si se seleccionó "Todos" O coincide el ID
          if (cadeteIdSeleccionado === 'all' || cadeteId.toString() === cadeteIdSeleccionado) {
            if (!pedidosPorCadete.has(cadeteId)) {
              pedidosPorCadete.set(cadeteId, []);
            }
            pedidosPorCadete.get(cadeteId)!.push(pedido);
          }
        }
      }
    });

    // Crear informes por cadete
    pedidosPorCadete.forEach((pedidos, cadeteId) => {
      const cadete = this.cadetes.find(c => c.id === cadeteId);
      if (cadete) {
        // Ordenar pedidos por zona si está disponible
        const pedidosOrdenados = pedidos.sort((a, b) => {
          const zonaA = a.usuario?.zona || '';
          const zonaB = b.usuario?.zona || '';
          return zonaA.localeCompare(zonaB);
        });

        this.informesCadetes.push({
          cadete: cadete,
          pedidos: pedidosOrdenados
        });
      }
    });

    if (this.informesCadetes.length === 0) {
      Swal.fire({
        title: 'Sin informes',
        text: 'No hay pedidos en recorrido para el filtro seleccionado.',
        icon: 'info',
        background: '#1a1a1a',
        color: '#f8edda',
        confirmButtonColor: '#edb110'
      });
      return;
    }

    // Activar modo impresión
    this.modoImpresion = true;
    this.fechaImpresion = new Date();

    // Esperar un momento para que se renderice y luego abrir diálogo de impresión
    setTimeout(() => {
      window.print();
    }, 500);
  }

  // Cerrar modo impresión
  cerrarImpresion() {
    this.modoImpresion = false;
  }

  // --- Funcionalidad Impresión Reporte Diario ---
  modoImpresionDiario = false;

  imprimirReporteDiario() {
    this.modoImpresionDiario = true;
    this.fechaImpresion = new Date(); // Actualizar fecha de impresión
    this.cd.detectChanges(); // Forzar actualización de la vista

    setTimeout(() => {
      window.print();
    }, 800);
  }

  cerrarImpresionDiario() {
    this.modoImpresionDiario = false;
  }

  // --- Funcionalidad Nueva ---
  showReporteModal = false;
  reporteVentas: ReporteVentas[] = [];

  limpiarEntregados() {
    Swal.fire({
      title: '¿Archivar pedidos entregados?',
      text: "Los pedidos con estado 'ENTREGADO' se ocultarán de la lista pero seguirán contando para los informes.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, archivar',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#f8edda',
      confirmButtonColor: '#edb110',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.archivarEntregados().subscribe({
          next: (count: number) => {
            if (count > 0) {
              Swal.fire({
                title: 'Archivados',
                text: `Se han archivado ${count} pedidos entregados.`,
                icon: 'success',
                background: '#1a1a1a',
                color: '#f8edda',
                confirmButtonColor: '#edb110'
              });
              // Pequeño delay para asegurar que el backend ha commiteado
              setTimeout(() => {
                this.loadPedidos();
              }, 500);
            } else {
              Swal.fire({
                title: 'Sin cambios',
                text: 'No se encontraron pedidos en estado ENTREGADO.',
                icon: 'info',
                background: '#1a1a1a',
                color: '#f8edda',
                confirmButtonColor: '#edb110'
              });
            }
          },
          error: (err) => {
            console.error(err);
            const errorMessage = typeof err.error === 'string' ? err.error : (err.error?.message || 'No se pudo archivar los pedidos.');
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              background: '#1a1a1a',
              color: '#f8edda',
              confirmButtonColor: '#edb110'
            });
          }
        });
      }
    });
  }

  verReporteVentas() {
    this.pedidoService.getReporteVentas().subscribe(data => {
      this.reporteVentas = data;
      this.showReporteModal = true;
    });
  }

  closeReporteModal() {
    this.showReporteModal = false;
  }

  // --- Reporte Diario ---
  showReporteDiarioModal = false;
  reporteDiario: ReporteDiarioCompleto | null = null;

  verReporteDiario() {
    this.pedidoService.getReporteDiario().subscribe(data => {
      this.reporteDiario = data;
      this.showReporteDiarioModal = true;
    });
  }

  closeReporteDiarioModal() {
    this.showReporteDiarioModal = false;
  }
}
