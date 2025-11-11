import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: [localStorage.getItem('rememberedUser') || '', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { username, password, rememberMe } = this.form.value;

    if (rememberMe) {
      localStorage.setItem('rememberedUser', username);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    this.authService.login(username, password).subscribe({
      next: res => {
        console.log('Token recibido:', res.token);
        localStorage.setItem('token', res.token);
        // redirigir al dashboard si querés
      },
      error: err => {
        alert('Credenciales inválidas');
      }
    });
  }
}
