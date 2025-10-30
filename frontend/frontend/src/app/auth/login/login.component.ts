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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

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
