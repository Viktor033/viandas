import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
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
    private router = inject(Router); // Injected Router

    userName: string = 'Usuario';
    isAdmin: boolean = false;
    showCart: boolean = false;
    showUserMenu = false; // Moved declaration here
    isMobileMenuOpen = false; // Added new property

    ngOnInit() {
        // Updated to use subscription for dynamic user updates
        this.authService.currentUser$.subscribe(user => {
            this.userName = user ? user.nombre : 'Usuario';
            this.isAdmin = user?.rol === 'ADMIN';
        });

        // Escuchar evento de cierre desde el componente hijo
        document.addEventListener('closeCart', () => {
            this.showCart = false;
        });

        // Cerrar menú móvil y de usuario al cambiar de ruta
        this.router.events.subscribe(() => {
            this.isMobileMenuOpen = false;
            this.showUserMenu = false;
        });
    }

    toggleCart() {
        this.showCart = !this.showCart;
    }

    toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
    }

    toggleMobileMenu() { // Added new method
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    closeUserMenu() {
        this.showUserMenu = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Si el clic NO fue dentro del dropdown container, cerrar menú
        if (!target.closest('.user-dropdown-container')) {
            this.showUserMenu = false;
        }
    }

    logout() {
        this.authService.logout();
    }
}
