import { Component, OnInit, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PedidoService, ResumenSemanal } from '../../services/pedido.service';
import { interval, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocina-resumen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cocina-resumen.component.html',
  styleUrls: ['./cocina-resumen.component.scss']
})
export class CocinaResumenComponent implements OnInit, OnDestroy {
  private pedidoService = inject(PedidoService);
  private platformId = inject(PLATFORM_ID);
  
  resumen?: ResumenSemanal;
  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  productosSemanales = ['STANDARD', 'CALORIAS', 'SALAD'];
  opcionesFinSemana = ['OPC 1', 'OPC 2', 'OPC 3', 'EXTRA'];
  
  loading = true;
  private refreshSubscription?: Subscription;

  ngOnInit(): void {
    this.cargarResumen();
    if (isPlatformBrowser(this.platformId)) {
      this.refreshSubscription = interval(3000).subscribe(() => {
        this.cargarResumen();
      });
    }
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  cargarResumen(): void {
    this.pedidoService.getResumenSemanal().subscribe({
      next: (res) => {
        this.resumen = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar resumen semanal', err);
        this.loading = false;
      }
    });
  }

  getCounts(prod: string, dia: string) {
    return this.resumen?.totalesSemanales[prod]?.[dia] || { normal: 0, sinSal: 0 };
  }

  getFinSemanaCount(op: string, dia: string) {
    return this.resumen?.totalesFinSemana[op]?.[dia] || 0;
  }
}
