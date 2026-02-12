import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    phone: string = '';
    loading: boolean = false;
    private router = inject(Router);
    private authService = inject(AuthService);

    onSubmit() {
        if (!this.phone) {
            alert('Por favor ingresa un número de celular.');
            return;
        }

        this.loading = true;

        // El login ahora devuelve una subscription porque llama al backend
        this.authService.login(this.phone).add(() => {
            this.loading = false;
        });
    }
}
