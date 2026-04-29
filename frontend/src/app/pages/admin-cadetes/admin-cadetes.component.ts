import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CadeteService, Cadete } from '../../services/cadete.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-cadetes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-cadetes.component.html',
  styleUrls: ['./admin-cadetes.component.scss']
})
export class AdminCadetesComponent implements OnInit {
  private cadeteService = inject(CadeteService);
  private notifyService = inject(NotificationService);
  private fb = inject(FormBuilder);

  cadetes: Cadete[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';

  showModal: boolean = false;
  isEditing: boolean = false;
  editingId: number | null = null;
  cadeteForm: FormGroup;

  constructor() {
    this.cadeteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      vehiculo: ['', Validators.required],
      telefono: ['', Validators.required],
      activo: [true]
    });
  }

  ngOnInit() {
    this.loadCadetes();
  }

  loadCadetes() {
    this.isLoading = true;
    this.cadeteService.getCadetes().subscribe({
      next: (data) => {
        // En cadetes solemos mostrar tanto activos como inactivos (para gestionar el estado)
        // Pero si la regla original era ocultarlos: this.cadetes = data.filter(c => c.activo !== false)
        // Para admin preferimos ver todos, pero respeto la lógica original
        this.cadetes = data; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando cadetes', err);
        this.isLoading = false;
      }
    });
  }

  get filteredCadetes() {
    if (!this.searchTerm) return this.cadetes;
    const term = this.searchTerm.toLowerCase();
    return this.cadetes.filter(c => 
      c.nombre.toLowerCase().includes(term) || 
      c.apellido.toLowerCase().includes(term) || 
      c.vehiculo.toLowerCase().includes(term) ||
      c.telefono.includes(term)
    );
  }

  openModal(cadete?: Cadete) {
    if (cadete) {
      this.isEditing = true;
      this.editingId = cadete.id || null;
      this.cadeteForm.patchValue({
        nombre: cadete.nombre,
        apellido: cadete.apellido,
        vehiculo: cadete.vehiculo,
        telefono: cadete.telefono,
        activo: cadete.activo !== false
      });
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.cadeteForm.reset({ activo: true });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCadete() {
    if (this.cadeteForm.invalid) {
      this.cadeteForm.markAllAsTouched();
      return;
    }

    const cadeteData: Cadete = this.cadeteForm.value;

    if (this.isEditing && this.editingId) {
      this.cadeteService.updateCadete(this.editingId, cadeteData).subscribe({
        next: () => {
          this.notifyService.toastSuccess('Cadete actualizado correctamente');
          this.loadCadetes();
          this.closeModal();
        },
        error: () => this.notifyService.error('Error', 'Error al actualizar cadete')
      });
    } else {
      this.cadeteService.createCadete(cadeteData).subscribe({
        next: () => {
          this.notifyService.toastSuccess('Cadete creado correctamente');
          this.loadCadetes();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating cadete:', err);
          const errorMsg = err.error?.message || err.message || 'Error desconocido';
          this.notifyService.error('Error al crear cadete', errorMsg);
        }
      });
    }
  }

  async deleteCadete(id: number) {
    const confirm = await this.notifyService.confirm(
      '¿Eliminar Cadete?',
      'No podrás revertir esto',
      'Sí, eliminar',
      true
    );

    if (confirm) {
      this.cadeteService.deleteCadete(id).subscribe({
        next: () => {
          this.notifyService.toastSuccess('Cadete eliminado');
          this.loadCadetes();
        },
        error: () => this.notifyService.error('Error', 'Error al eliminar')
      });
    }
  }
}
