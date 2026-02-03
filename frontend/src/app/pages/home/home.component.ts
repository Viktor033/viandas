import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    private authService = inject(AuthService);
    userRole: string | null = '';

    ngOnInit() {
        this.userRole = this.authService.getUserRole();
    }

    logout() {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que deseas salir del sistema?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            background: '#1a1a1a',
            color: '#f8edda',
            confirmButtonColor: '#ff6b6b',
            cancelButtonColor: '#6c757d',
            customClass: {
                popup: 'swal-custom-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
            }
        });
    }
}
