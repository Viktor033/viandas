import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
    products = [
        {
            title: 'Milanesa Napolitana',
            description: 'Carne / Pollo',
            price: 10000,
            image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: 'Empanadas',
            description: 'Jamon-Queso-Carne-Pollo | Frita o Horno',
            price: 13000,
            image: 'https://images.unsplash.com/photo-1626776876729-bab4306261ca?q=80&w=2070&auto=format&fit=crop'
        },
        {
            title: 'Pizza',
            description: 'Muzzarellas | Comun | Calabresa | ConGos',
            price: 12000,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000&auto=format&fit=crop'
        }
    ];

    addToCart(product: any) {
        alert(`¡${product.title} agregado al carrito!`);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
