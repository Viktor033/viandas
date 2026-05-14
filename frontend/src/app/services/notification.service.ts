import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  // Paleta de colores estándar (modo oscuro elegante)
  private defaultOptions = {
    background: '#1a1a1a',
    color: '#f8edda',
    confirmButtonColor: '#edb110', // Dorado/Secundario
    cancelButtonColor: '#6c757d', // Gris
  };

  constructor() { }

  /**
   * Muestra una notificación de éxito que se cierra sola.
   */
  success(title: string, text: string = '', timer: number = 2000): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.defaultOptions,
      icon: 'success',
      title,
      text,
      timer,
      showConfirmButton: false
    });
  }

  /**
   * Muestra un mensaje de error.
   */
  error(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.defaultOptions,
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#ff6b6b' // Rojo para errores
    });
  }

  /**
   * Muestra una advertencia.
   */
  warning(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.defaultOptions,
      icon: 'warning',
      title,
      text
    });
  }

  /**
   * Muestra un modal de confirmación (ej. para eliminar).
   */
  confirm(title: string, text: string, confirmButtonText: string = 'Sí, confirmar', isDanger: boolean = false): Promise<boolean> {
    return Swal.fire({
      ...this.defaultOptions,
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isDanger ? '#ff6b6b' : this.defaultOptions.confirmButtonColor,
      cancelButtonText: 'Cancelar',
      confirmButtonText
    }).then((result) => result.isConfirmed);
  }

  /**
   * Muestra un toast en la esquina (discreto).
   */
  toastSuccess(title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: this.defaultOptions.background,
      color: this.defaultOptions.color
    });

    Toast.fire({
      icon: 'success',
      title
    });
  }
}
