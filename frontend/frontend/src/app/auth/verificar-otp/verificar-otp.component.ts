import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificar-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verificar-otp.component.html',
  styleUrls: ['./verificar-otp.component.scss']
})
export class VerificarOtpComponent {
  telefono: string = '';
  codigo: string = '';
  mensaje: string = '';
  otpEnviado: boolean = false;

  constructor(private http: HttpClient) {}

  enviarOtp() {
    this.http.post('/api/send-otp', { telefono: this.telefono }).subscribe({
      next: () => {
        this.mensaje = 'OTP enviado por SMS';
        this.otpEnviado = true;
      },
      error: (err) => {
        this.mensaje = err.error || 'Error al enviar OTP';
        this.otpEnviado = false;
      }
    });
  }

  verificarOtp() {
    this.http.post('/api/verify-otp', {
      telefono: this.telefono,
      codigo: this.codigo
    }).subscribe({
      next: (res: any) => this.mensaje = res,
      error: (err) => this.mensaje = err.error || 'OTP incorrecto'
    });
  }
}
