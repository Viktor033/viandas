import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetallePedido {
    producto: { nombre: string }; // Simplificado para mostrar
    cantidad: number;
    precioUnitario: number;
}

export interface Pedido {
    id: number;
    fecha: string;
    estado: string;
    total: number;
    detalles: DetallePedido[];
}

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private http = inject(HttpClient);
    private apiUrl = '/api/pedidos';

    crearPedido(items: { productoId: number, cantidad: number }[]): Observable<any> {
        return this.http.post(this.apiUrl, { items });
    }

    getMisPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/mis-pedidos`);
    }
}
