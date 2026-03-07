import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    private authService = inject(AuthService);
    private clienteService = inject(ClienteService);

    usuario: Cliente | null = null;
    loading = false;

    ngOnInit() {
        this.loadUser();
    }

    loadUser() {
        const localData = this.authService.getUserData();
        if (localData && localData.id) {
            this.loading = true;
            // Fetch fresh data from server
            this.clienteService.getCliente(localData.id).subscribe({
                next: (data) => {
                    this.usuario = data;
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Error cargando perfil', err);
                    this.loading = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cargar la información del perfil.',
                        background: '#1a1a1a',
                        color: '#f8edda',
                        confirmButtonColor: '#edb110'
                    });
                }
            });
        }
    }

    onSubmit() {
        if (!this.usuario || !this.usuario.id) return;

        this.loading = true;
        this.clienteService.updateCliente(this.usuario.id, this.usuario).subscribe({
            next: (updatedUser) => {
                this.loading = false;
                // Update local storage if needed, or just notify
                // localStorage.setItem('user_data', JSON.stringify(updatedUser)); // Optional: keep local sync

                Swal.fire({
                    icon: 'success',
                    title: '¡Perfil Actualizado!',
                    text: 'Tus datos se han guardado correctamente.',
                    background: '#1a1a1a',
                    color: '#f8edda',
                    confirmButtonColor: '#edb110'
                });
            },
            error: (err) => {
                console.error('Error actualizando perfil', err);
                this.loading = false;
                let msg = 'No se pudo actualizar el perfil.';
                if (err.error && typeof err.error === 'string') msg = err.error;

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: msg,
                    background: '#1a1a1a',
                    color: '#f8edda',
                    confirmButtonColor: '#edb110'
                });
            }
        });
    }
}
