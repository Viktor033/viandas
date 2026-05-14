import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cadete {
    id?: number;
    nombre: string;
    apellido: string;
    vehiculo: string;
    telefono: string;
    activo: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CadeteService {
    private http = inject(HttpClient);
    private apiUrl = '/api/cadetes';

    getCadetes(): Observable<Cadete[]> {
        return this.http.get<Cadete[]>(this.apiUrl);
    }

    getCadete(id: number): Observable<Cadete> {
        return this.http.get<Cadete>(`${this.apiUrl}/${id}`);
    }

    createCadete(cadete: Cadete): Observable<Cadete> {
        return this.http.post<Cadete>(this.apiUrl, cadete);
    }

    updateCadete(id: number, cadete: Cadete): Observable<Cadete> {
        return this.http.put<Cadete>(`${this.apiUrl}/${id}`, cadete);
    }

    deleteCadete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
