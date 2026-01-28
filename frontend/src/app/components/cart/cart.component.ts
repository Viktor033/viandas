import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    cartService = inject(CartService);
    private pedidoService = inject(PedidoService);
    private router = inject(Router);

    cartItems$ = this.cartService.cart$;
    total: number = 0;
    isProcessing: boolean = false;

    ngOnInit() {
        this.cartItems$.subscribe(items => {
            this.total = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
        });
    }

    close() {
        // Este método será llamado desde el padre o servicio
        // Por simplicidad, usaremos un output o controlaremos la visibilidad desde Navbar
    }

    removeItem(id: number) {
        if (id) this.cartService.removeFromCart(id);
    }

    confirmOrder(items: CartItem[]) {
        if (items.length === 0) return;

        this.isProcessing = true;
        const itemsDto = items.map(item => ({
            productoId: item.producto.id!,
            cantidad: item.cantidad
        }));

        this.pedidoService.crearPedido(itemsDto).subscribe({
            next: (res) => {
                alert('¡Pedido confirmado!');
                this.cartService.clearCart();
                this.isProcessing = false;
                // Cerrar modal y navegar
                this.closeModal();
                this.router.navigate(['/mis-pedidos']);
            },
            error: (err) => {
                console.error(err);
                alert('Error al confirmar pedido');
                this.isProcessing = false;
            }
        });
    }

    // Helper para cerrar visualmente si se usa como componente inyectado
    closeModal() {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.classList.add('hidden'); // Simple toggle logic or handled by parent
            // Mejor práctica: Emit event to parent
            this.closeRequest();
        }
    }

    closeRequest() {
        // Logic to notify navbar to hide cart
        document.dispatchEvent(new CustomEvent('closeCart'));
    }
}
