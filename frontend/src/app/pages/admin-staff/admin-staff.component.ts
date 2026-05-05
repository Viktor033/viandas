import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';
import { CadeteService, Cadete } from '../../services/cadete.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

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
  
  activeTab: 'staff' | 'cadetes' = 'staff';
  staffList: Cliente[] = [];
  cadetesList: Cadete[] = [];
  
  showModal: boolean = false;
  isEditing: boolean = false;
  
  editingUser: Cliente = this.getEmptyUser();
  editingCadete: Cadete = this.getEmptyCadete();
  passwordTemp: string = '';

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
        this.staffList = data.filter(u => u.rol === 'ADMIN' || u.rol === 'COCINERO');
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

  switchTab(tab: 'staff' | 'cadetes'): void {
    this.activeTab = tab;
  }

  abrirModalNuevo(): void {
    if (this.activeTab === 'staff') {
      this.editingUser = this.getEmptyUser();
      this.passwordTemp = '';
    } else {
      this.editingCadete = this.getEmptyCadete();
    }
    this.isEditing = false;
    this.showModal = true;
  }

  editarUsuario(user: Cliente): void {
    this.editingUser = { ...user };
    this.passwordTemp = '';
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
    if (this.activeTab === 'staff') {
      this.guardarUsuario();
    } else {
      this.guardarCadete();
    }
  }

  private guardarUsuario(): void {
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
      },
      error: () => alert('Error al procesar la solicitud')
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
      },
      error: () => alert('Error al procesar la solicitud')
    });
  }

  eliminarUsuario(user: Cliente): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.nombre}?`)) {
      this.clienteService.deleteCliente(user.id!).subscribe({
        next: () => this.cargarStaff(),
        error: () => alert('Error al eliminar usuario')
      });
    }
  }

  eliminarCadete(cadete: Cadete): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al cadete ${cadete.nombre}?`)) {
      this.cadeteService.deleteCadete(cadete.id!).subscribe({
        next: () => this.cargarCadetes(),
        error: () => alert('Error al eliminar cadete')
      });
    }
  }
}
