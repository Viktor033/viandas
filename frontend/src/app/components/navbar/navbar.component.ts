import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, CartComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    private authService = inject(AuthService);
    public cartService = inject(CartService);

    userName: string = 'Usuario';
    isAdmin: boolean = false;
    showCart: boolean = false;

    ngOnInit() {
        this.userName = this.authService.getCurrentUser() || 'Usuario';
        this.isAdmin = this.authService.getUserRole() === 'ADMIN';

        // Escuchar evento de cierre desde el componente hijo
        document.addEventListener('closeCart', () => {
            this.showCart = false;
        });
    }

    toggleCart() {
        this.showCart = !this.showCart;
    }
}
