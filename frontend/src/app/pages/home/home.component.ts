import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    private authService = inject(AuthService);
    userRole: string | null = '';

    ngOnInit() {
        this.userRole = this.authService.getUserRole();
    }

    logout() {
        this.authService.logout();
    }
}
