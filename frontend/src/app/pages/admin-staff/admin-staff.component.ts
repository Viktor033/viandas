import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-staff.component.html',
  styles: [`
    .admin-staff-container { padding: 20px; font-family: sans-serif; }
    .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
    .role-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .admin { background: #e3f2fd; color: #1976d2; }
    .cocina { background: #fbe9e7; color: #d84315; }
    .btn-add { background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
    .modal-content { background:white; padding:30px; border-radius:8px; width:400px; }
    .form-group { margin-bottom: 15px; display:flex; flex-direction:column; gap:5px; }
    input, select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    .modal-footer { display:flex; justify-content:flex-end; gap:10px; margin-top:20px; }
  `]
})
export class AdminStaffComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private platformId = inject(PLATFORM_ID);
  
  staffList: Cliente[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  editingUser: Cliente = this.getEmptyUser();
  passwordTemp: string = '';

  ngOnInit(): void {
    this.cargarStaff();
  }

  getEmptyUser(): Cliente {
    return {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rol: 'COCINERO',
      activo: true
    };
  }

  cargarStaff(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.staffList = data.filter(u => u.rol === 'ADMIN' || u.rol === 'COCINERO');
      },
      error: (err) => console.error('Error al cargar staff', err)
    });
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
  }

  guardarUsuario(): void {
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
