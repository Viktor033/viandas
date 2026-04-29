import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadete } from './cadete.service';

export interface Cliente {
    id?: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email?: string;
    rol: string;
    activo: boolean;
    // Campos nuevos
    zona?: string;
    direccion?: string;
    piso?: string;
    departamento?: string;
    observaciones?: string;
    cadete?: Cadete;
}

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private http = inject(HttpClient);
    private apiUrl = '/api/usuarios';

    getClientes(): Observable<Cliente[]> {
        // En un futuro filtrar por rol aquí o en backend
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }

    createCliente(cliente: Cliente): Observable<Cliente> {
        // Asegurar rol usuario si no viene
        if (!cliente.rol) cliente.rol = 'USUARIO';
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
    }

    deleteCliente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
