import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    activo: boolean;
    dia?: string; // 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Todos'
}

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private http = inject(HttpClient);
    private apiUrl = '/api/productos'; // Proxy configurado o URL completa

    getProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.apiUrl);
    }

    createProducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.apiUrl, producto);
    }

    updateProducto(id: number, producto: Producto): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    }

    deleteProducto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
