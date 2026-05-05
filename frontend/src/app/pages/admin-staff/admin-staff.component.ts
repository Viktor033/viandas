import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.scss']
})
export class AdminStaffComponent implements OnInit {
  private usuarioService = inject(ClienteService);
  
  usuarios: Cliente[] = [];
  staff: Cliente[] = [];
  
  editingUser: Partial<Cliente> | null = null;
  isNewUser = false;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getClientes().subscribe({
      next: (data) => {
        this.usuarios = data;
        // Filtrar solo Staff (Admin y Cocinero)
        this.staff = data.filter(u => u.rol === 'ADMIN' || u.rol === 'COCINERO');
      },
      error: (err) => console.error('Error al cargar staff', err)
    });
  }

  abrirModalNuevo(): void {
    this.editingUser = {
      nombre: '',
      apellido: '',
      telefono: '',
      rol: 'COCINERO',
      activo: true
    };
    this.isNewUser = true;
  }

  editarUsuario(user: Cliente): void {
    this.editingUser = { ...user };
    this.isNewUser = false;
  }

  cerrarModal(): void {
    this.editingUser = null;
  }

  guardarUsuario(): void {
    if (!this.editingUser) return;

    if (this.isNewUser) {
      this.usuarioService.createCliente(this.editingUser as Cliente).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Personal creado correctamente', 'success');
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (err) => Swal.fire('Error', err.error?.message || 'Error al crear', 'error')
      });
    } else {
      this.usuarioService.updateCliente(this.editingUser.id!, this.editingUser as Cliente).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Personal actualizado', 'success');
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (err) => Swal.fire('Error', 'Error al actualizar', 'error')
      });
    }
  }

  eliminarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteCliente(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
            this.cargarUsuarios();
          }
        });
      }
    });
  }
}
