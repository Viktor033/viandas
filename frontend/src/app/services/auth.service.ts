import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);
    private http = inject(HttpClient);
    private tokenKey = 'auth_token';

    constructor() { }

    // Simulación de Logout
    logout() {
        localStorage.removeItem(this.tokenKey);
        // Opcional: Limpiar otros datos de sesión
        console.log('Sesión cerrada');
        this.router.navigate(['/']);
        // Aquí podrías mostrar un toast o alerta
        alert('Has cerrado sesión correctamente');
    }

    // Login con teléfono
    login(phone: string) {
        return this.http.post<any>('/api/auth/login', { telefono: phone }).subscribe({
            next: (user) => {
                localStorage.setItem(this.tokenKey, 'mock-token'); // Simil token
                localStorage.setItem('user_role', user.rol);
                localStorage.setItem('user_data', JSON.stringify(user));

                if (user.rol === 'ADMIN') {
                    // Por ahora redirige a home, luego a admin
                    console.log('Admin logged in');
                    this.router.navigate(['/home']);
                } else {
                    this.router.navigate(['/home']);
                }
            },
            error: (err) => {
                alert('Login fallido: ' + (err.error || 'Error desconocido'));
            }
        });
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getUserRole(): string | null {
        return localStorage.getItem('user_role');
    }
}
