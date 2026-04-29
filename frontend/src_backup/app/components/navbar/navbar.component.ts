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

        // Inicializar tema
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'design') {
            this.isDesignTheme = true;
            document.body.classList.add('theme-design');
        }

        // Escuchar evento de cierre desde el componente hijo
        document.addEventListener('closeCart', () => {
            this.showCart = false;
        });
    }

    toggleCart() {
        this.showCart = !this.showCart;
    }

    // --- Theme Switcher ---
    isDesignTheme = false;

    // --- User Dropdown ---
    // --- User Dropdown ---
    showUserMenu = false;

    toggleTheme() {
        this.isDesignTheme = !this.isDesignTheme;
        if (this.isDesignTheme) {
            document.body.classList.add('theme-design');
            localStorage.setItem('theme', 'design');
        } else {
            document.body.classList.remove('theme-design');
            localStorage.setItem('theme', 'default');
        }
    }

    toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
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
