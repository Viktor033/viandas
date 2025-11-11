import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-celular',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-celular.component.html',
  styleUrls: ['./login-celular.component.scss']
})
export class LoginCelularComponent {
  phoneForm: FormGroup;
  codeForm: FormGroup;
  step: 'phone' | 'code' = 'phone';
  phoneValue: string = '';

  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  sendCode() {
    this.loading = true;
    this.message = '';
    this.error = '';
    this.phoneValue = this.phoneForm.value.phone;

    this.authService.sendOtp(this.phoneValue).subscribe(() => {
      this.loading = false;
      this.step = 'code';
      this.message = '📲 Código enviado al celular';
    }, () => {
      this.loading = false;
      this.error = '❌ No se pudo enviar el código';
    });
  }

  verifyCode() {
    this.loading = true;
    this.message = '';
    this.error = '';
    const code = this.codeForm.value.code;

    this.authService.verifyOtp(this.phoneValue, code).subscribe((res: any) => {
      this.loading = false;
      localStorage.setItem('token', res.token);
      this.message = '✅ Código verificado. Redirigiendo...';
      setTimeout(() => this.router.navigate(['/dashboard']), 1500);
    }, () => {
      this.loading = false;
      this.error = '❌ Código inválido';
    });
  }
}
