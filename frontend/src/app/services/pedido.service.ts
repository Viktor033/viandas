import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from './cliente.service';

export interface DetallePedido {
    producto: { nombre: string; precio: number };
    cantidad: number;
    precioUnitario: number;
}

export interface Pedido {
    id: number;
    fecha: string;
    estado: string;
    metodoPago: string;
    total: number;
    detalles: DetallePedido[];
    usuario: Cliente;
}

export interface ReporteVentas {
    producto: string;
    cantidad: number;
    total: number;
}

export interface ReporteDiario {
    metodoPago: string;
    cantidadPedidos: number;
    totalVentas: number;
}

export interface ReporteProductoDia {
    nombre: string;
    cantidad: number;
    subtotal: number;
}

export interface ReporteDiarioCompleto {
    resumenPagos: ReporteDiario[];
    rankingProductos: ReporteProductoDia[];
    totalGeneral: number;
    cantidadPedidos: number;
}

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    crearPedido(data: { items: { productoId: number, cantidad: number }[], metodoPago: string }): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    crearPedidoConDias(data: {
        detalles: { productoId: number; cantidad: number; precioUnitario: number; observaciones: string }[];
        diasSeleccionados: string;
        esMensual: boolean;
        metodoPago: string;
    }): Observable<any> {
        // Redirigir al nuevo controlador independiente para evadir los 404 del PedidoController
        const carritoUrl = this.apiUrl.replace('/pedidos', '/carrito');
        return this.http.post(`${carritoUrl}/enviar`, data);
    }

    createPreferenceMP(data: { items: { productoId: number, cantidad: number }[], metodoPago: string }): Observable<{ init_point: string }> {
        return this.http.post<{ init_point: string }>(`${this.apiUrl}/checkout-mp`, data);
    }

    getMisPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/mis-pedidos`);
    }

    getAllPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/admin/todos`);
    }

    updateEstado(id: number, estado: string): Observable<Pedido> {
        return this.http.put<Pedido>(`${this.apiUrl}/${id}/estado`, JSON.stringify(estado), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Obtener pedidos de un cadete específico
    getPedidosByCadete(cadeteId: number): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/cadete/${cadeteId}`);
    }

    archivarEntregados(): Observable<number> {
        return this.http.post<number>(`${this.apiUrl}/admin/archivar-entregados`, {});
    }

    getReporteVentas(): Observable<ReporteVentas[]> {
        return this.http.get<ReporteVentas[]>(`${this.apiUrl}/admin/reporte-ventas`);
    }

    getReporteDiario(): Observable<ReporteDiarioCompleto> {
        return this.http.get<ReporteDiarioCompleto>(`${this.apiUrl}/admin/reporte-diario`);
    }

    // --- Historial Cliente ---
    getPedidosByCliente(clienteId: number): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/admin/cliente/${clienteId}`);
    }

    deletePedidosEntregadosByCliente(clienteId: number): Observable<number> {
        return this.http.delete<number>(`${this.apiUrl}/admin/cliente/${clienteId}/entregados`);
    }

    deleteAllPedidosByCliente(clienteId: number): Observable<number> {
        return this.http.delete<number>(`${this.apiUrl}/admin/cliente/${clienteId}/todos`);
    }
}
