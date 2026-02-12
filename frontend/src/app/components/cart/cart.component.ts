import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, FormsModule],
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
    selectedPaymentMethod: string = 'EFECTIVO';

    ngOnInit() {
        this.cartItems$.subscribe(items => {
            this.total = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
        });
    }

    close() {
        // Este método será llamado desde el padre o servicio
        // Por simplicidad, usaremos un output o controlaremos la visibilidad desde Navbar
    }

    removeItem(item: CartItem) {
        if (item.cantidad > 1) {
            Swal.fire({
                title: '¿Qué deseas hacer?',
                text: `Tienes ${item.cantidad} unidades de ${item.producto.nombre}`,
                icon: 'question',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Quitar solo 1',
                denyButtonText: 'Eliminar todo',
                cancelButtonText: 'Cancelar',
                background: '#1a1a1a',
                color: '#f8edda',
                confirmButtonColor: '#edb110', // Dorado -> Reducir
                denyButtonColor: '#ff6b6b',    // Rojo -> Eliminar todo
                cancelButtonColor: '#6c757d',
                customClass: {
                    actions: 'swal-custom-actions' // Optional for layout adjustments
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cartService.decreaseQuantity(item.producto.id!);
                } else if (result.isDenied) {
                    this.cartService.removeFromCart(item.producto.id!);
                }
            });
        } else {
            // Solo 1 unidad, confirmar eliminación simple
            Swal.fire({
                title: '¿Eliminar producto?',
                text: `¿Seguro que quieres sacar ${item.producto.nombre} del carrito?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                background: '#1a1a1a',
                color: '#f8edda',
                confirmButtonColor: '#ff6b6b',
                cancelButtonColor: '#6c757d'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cartService.removeFromCart(item.producto.id!);
                }
            });
        }
    }

    confirmOrder(items: CartItem[]) {
        if (items.length === 0) return;

        // DEBUG: Alertar método seleccionado para confirmar actualización
        //alert('DEBUG: Método seleccionado -> ' + this.selectedPaymentMethod);

        this.isProcessing = true;
        const itemsDto = {
            items: items.map(item => ({
                productoId: item.producto.id!,
                cantidad: item.cantidad
            })),
            metodoPago: this.selectedPaymentMethod
        };

        console.log('Confirmando orden. Método seleccionado:', this.selectedPaymentMethod);

        if (this.selectedPaymentMethod === 'MERCADOPAGO' || this.selectedPaymentMethod === 'TARJETA') {
            console.log('Iniciando flujo MercadoPago/Tarjeta...');
            this.pedidoService.createPreferenceMP(itemsDto).subscribe({
                next: (res) => {
                    // Redirigir a MercadoPago
                    window.location.href = res.init_point;
                },
                error: (err) => {
                    console.error('Error MP:', err);
                    const errorMsg = typeof err.error === 'string' ? err.error : (err.message || 'Error desconocido');
                    Swal.fire({
                        title: 'Error MP',
                        text: errorMsg,
                        icon: 'error',
                        background: '#1a1a1a',
                        color: '#f8edda',
                        confirmButtonColor: '#ff6b6b'
                    });
                    this.isProcessing = false;
                }
            });
            return;
        }

        this.pedidoService.crearPedido(itemsDto).subscribe({
            next: (res) => {
                if (this.selectedPaymentMethod === 'TRANSFERENCIA') {
                    Swal.fire({
                        title: '¡Pedido Confirmado!',
                        html: `
                            <p style="margin-bottom: 15px;">Tu pedido ha sido registrado. Para finalizar, realiza la transferencia a:</p>
                            <div style="background: #333; padding: 10px; border-radius: 8px; text-align: left; font-size: 0.9em; color: #fff;">
                                <p><strong>Alias:</strong> VIANDAS.MANOPLAS</p>
                                <p><strong>CBU:</strong> 0000003100000000000000</p>
                                <p><strong>Banco:</strong> Banco Provincia</p>
                                <p><strong>Titular:</strong> Juan Manoplas</p>
                            </div>
                            <p style="margin-top: 15px; font-size: 0.9em; color: #edb110;">
                                <i class="fab fa-whatsapp"></i> Compartí el comprobante por WhatsApp al <strong>3794908091</strong> y se procederá con su pedido.
                            </p>
                        `,
                        icon: 'info',
                        showCloseButton: true,
                        background: '#1a1a1a',
                        color: '#f8edda',
                        confirmButtonColor: '#25D366',
                        confirmButtonText: 'Entendido, enviar comprobante',
                        customClass: {
                            popup: 'swal-custom-popup'
                        }
                    }).then((result) => {
                        this.cartService.clearCart();
                        this.isProcessing = false;
                        this.closeModal();

                        // Si confirma (click en botón verde), abrir WhatsApp
                        if (result.isConfirmed) {
                            // Asumimos formato internacional para Argentina con 9 después de 54
                            window.open('https://wa.me/5493794908091?text=Hola,%20adjunto%20comprobante%20de%20transferencia%20para%20mi%20pedido.', '_blank');
                        }

                        this.router.navigate(['/mis-pedidos']);
                    });
                } else {
                    Swal.fire({
                        title: '¡Pedido Confirmado!',
                        text: `Tu pedido ha sido realizado con éxito. Método: ${this.selectedPaymentMethod}`, // DEBUG INCLUIDO
                        icon: 'success',
                        background: '#1a1a1a',
                        color: '#f8edda',
                        confirmButtonColor: '#edb110',
                        confirmButtonText: 'Genial',
                        customClass: {
                            popup: 'swal-custom-popup'
                        }
                    }).then(() => {
                        this.cartService.clearCart();
                        this.isProcessing = false;
                        this.closeModal();
                        this.router.navigate(['/mis-pedidos']);
                    });
                }
            },
            error: (err) => {
                console.error(err);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al procesar tu pedido.',
                    icon: 'error',
                    background: '#1a1a1a',
                    color: '#f8edda',
                    confirmButtonColor: '#ff6b6b'
                });
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
