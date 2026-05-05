import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.scss']
})
export class AdminStaffComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private platformId = inject(PLATFORM_ID);
  
  staffList: Cliente[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  editingUser: Cliente = this.getEmptyUser();
  passwordTemp: string = ''; // Para la clave general
  isNewUser = false;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  getEmptyUser(): Cliente {
    return {
      nombre: '',
      apellido: '',
      telefono: '',
      rol: 'COCINERO',
      activo: true
    };
  }

  cargarUsuarios(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.staffList = data.filter(u => u.rol === 'ADMIN' || u.rol === 'COCINERO');
      },
      error: (err) => console.error('Error al cargar staff', err)
    });
  }

  cargarStaff(): void {
    this.cargarUsuarios();
  }

  abrirModalNuevo(): void {
    this.editingUser = this.getEmptyUser();
    this.passwordTemp = '';
    this.isEditing = false;
    this.showModal = true;
  }

  editarUsuario(user: Cliente): void {
    this.editingUser = { ...user };
    this.passwordTemp = '';
    this.isEditing = true;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.editingUser = this.getEmptyUser();
  }

  guardarUsuario(): void {
    if (!this.editingUser) return;
    
    if (this.passwordTemp) {
      this.editingUser.password = this.passwordTemp;
    }

    const obs = this.isEditing 
      ? this.clienteService.updateCliente(this.editingUser.id!, this.editingUser)
      : this.clienteService.createCliente(this.editingUser);

    obs.subscribe({
      next: () => {
        this.cargarStaff();
        this.cerrarModal();
        alert(this.isEditing ? 'Usuario actualizado' : 'Usuario creado con éxito');
      },
      error: () => alert('Error al procesar la solicitud')
    });
  }

  eliminarUsuario(user: Cliente): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.nombre}?`)) {
      this.clienteService.deleteCliente(user.id!).subscribe({
        next: () => {
          this.cargarStaff();
          alert('Usuario eliminado correctamente');
        },
        error: () => alert('Error al eliminar usuario')
      });
    }
  }
}
