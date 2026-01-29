import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CadeteService, Cadete } from '../../services/cadete.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cadetes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './admin-cadetes.component.html',
  styleUrls: ['./admin-cadetes.component.scss']
})
export class AdminCadetesComponent {
  private cadeteService = inject(CadeteService);

  cadetes: Cadete[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;

  currentCadete: Cadete = {
    nombre: '',
    apellido: '',
    vehiculo: '',
    telefono: '',
    activo: true
  };

  ngOnInit() {
    this.loadCadetes();
  }

  loadCadetes() {
    this.cadeteService.getCadetes().subscribe({
      next: (data) => this.cadetes = data,
      error: (err) => console.error('Error cargando cadetes', err)
    });
  }

  openModal(cadete?: Cadete) {
    if (cadete) {
      this.isEditing = true;
      this.currentCadete = { ...cadete };
    } else {
      this.isEditing = false;
      this.resetForm();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  resetForm() {
    this.currentCadete = {
      nombre: '',
      apellido: '',
      vehiculo: '',
      telefono: '',
      activo: true
    };
  }

  saveCadete() {
    if (this.isEditing && this.currentCadete.id) {
      this.cadeteService.updateCadete(this.currentCadete.id, this.currentCadete).subscribe({
        next: () => {
          this.showSuccess('Cadete actualizado correctamente');
          this.loadCadetes();
          this.closeModal();
        },
        error: () => this.showError('Error al actualizar cadete')
      });
    } else {
      this.cadeteService.createCadete(this.currentCadete).subscribe({
        next: () => {
          this.showSuccess('Cadete creado correctamente');
          this.loadCadetes();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating cadete:', err);
          const errorMsg = err.error?.message || err.message || 'Error desconocido';
          const status = err.status || 'N/A';
          this.showError(`Error al crear cadete (${status}): ${errorMsg}`);
        }
      });
    }
  }

  deleteCadete(id: number) {
    Swal.fire({
      title: '¿Eliminar Cadete?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      background: '#1a1a1a',
      color: '#f8edda'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cadeteService.deleteCadete(id).subscribe({
          next: () => {
            this.showSuccess('Cadete eliminado');
            this.loadCadetes();
          },
          error: () => this.showError('Error al eliminar')
        });
      }
    });
  }

  private showSuccess(msg: string) {
    Swal.fire({
      title: 'Éxito',
      text: msg,
      icon: 'success',
      background: '#1a1a1a',
      color: '#f8edda',
      confirmButtonColor: '#edb110'
    });
  }

  private showError(msg: string) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'error',
      background: '#1a1a1a',
      color: '#f8edda',
      confirmButtonColor: '#ff6b6b'
    });
  }
}
