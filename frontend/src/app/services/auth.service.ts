import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);
    private http = inject(HttpClient);
    private tokenKey = 'auth_token';

    // Reactive user state
    private currentUserSubject = new BehaviorSubject<any>(this.getUserData());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    // Simulación de Logout
    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_data');
        this.currentUserSubject.next(null); // Update state
        console.log('Sesión cerrada');
        this.router.navigate(['/login']);
    }

    // Login con teléfono
    login(phone: string) {
        return this.http.post<any>('/api/auth/login', { telefono: phone }).subscribe({
            next: (user) => {
                localStorage.setItem(this.tokenKey, 'mock-token'); // Simil token
                localStorage.setItem('user_role', user.rol);
                localStorage.setItem('user_data', JSON.stringify(user));
                this.currentUserSubject.next(user); // Update state

                if (user.rol === 'ADMIN') {
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

    getCurrentUser(): string {
        const user = this.currentUserSubject.value;
        return user ? (user.nombre || 'Usuario') : 'Usuario';
    }

    getUserData(): any | null {
        const userData = localStorage.getItem('user_data');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
}
