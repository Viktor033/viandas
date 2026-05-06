import { Component, OnInit, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-cocina-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocina-dashboard.component.html',
  styleUrls: ['./cocina-dashboard.component.scss']
})
export class CocinaDashboardComponent implements OnInit, OnDestroy {
  private pedidoService = inject(PedidoService);
  private platformId = inject(PLATFORM_ID);
  
  pedidosPendientes: Pedido[] = [];
  pedidosEnPreparacion: Pedido[] = [];
  pedidosRealizados: Pedido[] = [];
  
  resumenProductos: any[] = [];
  totalGeneralViandas: number = 0;
  
  private refreshSubscription?: Subscription;

  ngOnInit(): void {
    this.cargarPedidos();
    // Auto-refresh cada 3 segundos para el "tiempo real"
    if (isPlatformBrowser(this.platformId)) {
      this.refreshSubscription = interval(3000).subscribe(() => {
        this.cargarPedidos();
      });
    }
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  calcularResumen(): void {
    const mapa = new Map<string, { nombre: string, total: number, sinSal: number }>();
    let totalViandas = 0;

    // Solo contamos Pendientes y En Preparación para la cocina
    const pedidosActivos = [...this.pedidosPendientes, ...this.pedidosEnPreparacion];

    pedidosActivos.forEach(pedido => {
      pedido.detalles.forEach(detalle => {
        const nombre = detalle.producto.nombre;
        const cantidad = detalle.cantidad;
        const esSinSal = detalle.observaciones?.toLowerCase().includes('sin sal') || 
                         detalle.observaciones?.toLowerCase().includes('s/s');

        if (!mapa.has(nombre)) {
          mapa.set(nombre, { nombre, total: 0, sinSal: 0 });
        }

        const stats = mapa.get(nombre)!;
        stats.total += cantidad;
        if (esSinSal) stats.sinSal += cantidad;
        
        totalViandas += cantidad;
      });
    });

    this.resumenProductos = Array.from(mapa.values());
    this.totalGeneralViandas = totalViandas;
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidosCocina().subscribe({
      next: (pedidos) => {
        const nuevosPendientes = pedidos.filter(p => p.estado === 'PENDIENTE');
        
        // Si hay más pedidos pendientes que antes, sonar la alerta
        if (nuevosPendientes.length > this.pedidosPendientes.length) {
          this.reproducirAlerta();
        }

        this.pedidosPendientes = nuevosPendientes;
        this.pedidosEnPreparacion = pedidos.filter(p => p.estado === 'EN_PREPARACION');
        this.pedidosRealizados = pedidos.filter(p => p.estado === 'EN_CAMINO');
        
        this.calcularResumen();
      },
      error: (err) => {
        console.error('Error al cargar pedidos de cocina', err);
      }
    });
  }

  private reproducirAlerta(): void {
    if (isPlatformBrowser(this.platformId)) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(err => console.log('Error al reproducir sonido (posible bloqueo del navegador):', err));
    }
  }

  pasarAPreparacion(pedido: Pedido): void {
    this.pedidoService.updateEstado(pedido.id, 'EN_PREPARACION').subscribe({
      next: () => {
        this.cargarPedidos();
      },
      error: (err) => {
        alert('No se pudo actualizar el estado');
      }
    });
  }

  finalizarPedido(pedido: Pedido): void {
    this.pedidoService.updateEstado(pedido.id, 'EN_CAMINO').subscribe({
      next: () => {
        alert('¡Pedido Finalizado! El pedido ha pasado a la lista de repartos.');
        this.cargarPedidos();
      },
      error: (err) => {
        alert('No se pudo finalizar el pedido');
      }
    });
  }
}
