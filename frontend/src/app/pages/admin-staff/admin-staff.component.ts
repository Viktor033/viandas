import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CadeteService, Cadete } from '../../services/cadete.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.scss']
})
export class AdminStaffComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private cadeteService = inject(CadeteService);
  private platformId = inject(PLATFORM_ID);
  
  activeTab: 'admin' | 'cocineros' | 'secretarios' | 'cadetes' = 'admin';
  staffList: Cliente[] = [];
  cadetesList: Cadete[] = [];
  
  showModal: boolean = false;
  isEditing: boolean = false;
  
  editingUser: Cliente = this.getEmptyUser();
  editingCadete: Cadete = this.getEmptyCadete();

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargarStaff();
    this.cargarCadetes();
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

  getEmptyCadete(): Cadete {
    return {
      nombre: '',
      apellido: '',
      vehiculo: '',
      telefono: '',
      activo: true
    };
  }

  cargarStaff(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.staffList = data.filter(u => u.rol === 'ADMIN' || u.rol === 'COCINERO' || u.rol === 'SECRETARIO');
      },
      error: (err) => console.error('Error al cargar staff', err)
    });
  }

  cargarCadetes(): void {
    this.cadeteService.getCadetes().subscribe({
      next: (data) => this.cadetesList = data,
      error: (err) => console.error('Error al cargar cadetes', err)
    });
  }

  get filteredStaff(): Cliente[] {
    if (this.activeTab === 'admin') return this.staffList.filter(u => u.rol === 'ADMIN');
    if (this.activeTab === 'cocineros') return this.staffList.filter(u => u.rol === 'COCINERO');
    if (this.activeTab === 'secretarios') return this.staffList.filter(u => u.rol === 'SECRETARIO');
    return [];
  }

  switchTab(tab: 'admin' | 'cocineros' | 'secretarios' | 'cadetes'): void {
    this.activeTab = tab;
  }

  abrirModalNuevo(): void {
    if (this.activeTab === 'cadetes') {
      this.editingCadete = this.getEmptyCadete();
    } else {
      this.editingUser = this.getEmptyUser();
      // Set default role based on current tab
      if (this.activeTab === 'admin') this.editingUser.rol = 'ADMIN';
      if (this.activeTab === 'cocineros') this.editingUser.rol = 'COCINERO';
      if (this.activeTab === 'secretarios') this.editingUser.rol = 'SECRETARIO';
    }
    this.isEditing = false;
    this.showModal = true;
  }

  editarUsuario(user: Cliente): void {
    this.editingUser = { ...user };
    this.isEditing = true;
    this.showModal = true;
  }

  editarCadete(cadete: Cadete): void {
    this.editingCadete = { ...cadete };
    this.isEditing = true;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardar(): void {
    if (this.activeTab === 'cadetes') {
      this.guardarCadete();
    } else {
      this.guardarUsuario();
    }
  }

  private guardarUsuario(): void {
    const obs = this.isEditing 
      ? this.clienteService.updateCliente(this.editingUser.id!, this.editingUser)
      : this.clienteService.createCliente(this.editingUser);

    obs.subscribe({
      next: () => {
        this.cargarStaff();
        this.cerrarModal();
        Swal.fire({
          icon: 'success',
          title: this.isEditing ? '✅ Personal actualizado' : '✅ Personal agregado',
          text: this.isEditing ? 'Los datos fueron guardados.' : 'El nuevo integrante fue registrado correctamente.',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      },
      error: (err) => {
        let msg = 'Verificá que el teléfono no esté ya registrado.';
        if (err?.error?.message) {
          msg = err.error.message;
        } else if (typeof err?.error === 'string') {
          try { const p = JSON.parse(err.error); msg = p.message || msg; } catch { msg = err.error; }
        }
        Swal.fire({ icon: 'error', title: '❌ Error al guardar', text: msg, confirmButtonColor: '#3182ce' });
      }
    });
  }

  private guardarCadete(): void {
    const obs = this.isEditing 
      ? this.cadeteService.updateCadete(this.editingCadete.id!, this.editingCadete)
      : this.cadeteService.createCadete(this.editingCadete);

    obs.subscribe({
      next: () => {
        this.cargarCadetes();
        this.cerrarModal();
        Swal.fire({
          icon: 'success',
          title: this.isEditing ? '✅ Cadete actualizado' : '✅ Cadete agregado',
          text: this.isEditing ? 'Los datos fueron guardados.' : 'El cadete fue registrado correctamente.',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      },
      error: () => Swal.fire({ icon: 'error', title: '❌ Error', text: 'No se pudo procesar la solicitud.', confirmButtonColor: '#3182ce' })
    });
  }

  enviarEmail(user: Cliente): void {
    const subject = encodeURIComponent('Acceso al Sistema - Manoplas Viandas');
    const body = encodeURIComponent(`Hola ${user.nombre},\n\nSe ha creado tu cuenta en el sistema de Manoplas Viandas.\n\nTu rol: ${user.rol}\nTu correo de acceso: ${user.email}\n\nPor favor, contacta al administrador para obtener tu clave temporal.\n\nSaludos!`);
    window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
  }

  eliminarUsuario(user: Cliente): void {
    Swal.fire({
      title: `¿Eliminar a ${user.nombre}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then(r => {
      if (r.isConfirmed) {
        this.clienteService.deleteCliente(user.id!).subscribe({
          next: () => {
            this.cargarStaff();
            Swal.fire({ icon: 'success', title: 'Eliminado', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
          },
          error: () => Swal.fire({ icon: 'error', title: 'Error al eliminar', confirmButtonColor: '#3182ce' })
        });
      }
    });
  }

  eliminarCadete(cadete: Cadete): void {
    Swal.fire({
      title: `¿Eliminar cadete ${cadete.nombre}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then(r => {
      if (r.isConfirmed) {
        this.cadeteService.deleteCadete(cadete.id!).subscribe({
          next: () => {
            this.cargarCadetes();
            Swal.fire({ icon: 'success', title: 'Cadete eliminado', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
          },
          error: () => Swal.fire({ icon: 'error', title: 'Error al eliminar', confirmButtonColor: '#3182ce' })
        });
      }
    });
  }
}
