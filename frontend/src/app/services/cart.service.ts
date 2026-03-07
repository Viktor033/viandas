import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './producto.service';
import { PedidoService } from './pedido.service';

export interface CartItem {
    producto: Producto;
    cantidad: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private pedidoService = inject(PedidoService);
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cart$ = this.cartItems.asObservable();

    addToCart(producto: Producto) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.producto.id === producto.id);

        if (existingItem) {
            existingItem.cantidad++;
            this.cartItems.next([...currentItems]);
        } else {
            this.cartItems.next([...currentItems, { producto, cantidad: 1 }]);
        }
    }

    decreaseQuantity(productoId: number) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.producto.id === productoId);
        if (existingItem) {
            existingItem.cantidad > 1
                ? (existingItem.cantidad--, this.cartItems.next([...currentItems]))
                : this.removeFromCart(productoId);
        }
    }

    removeFromCart(productoId: number) {
        this.cartItems.next(this.cartItems.value.filter(item => item.producto.id !== productoId));
    }

    clearCart() { this.cartItems.next([]); }

    getTotal(): number {
        return this.cartItems.value.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    }

    /**
     * Crea un pedido directamente desde el nuevo menú con días y observaciones por item.
     */
    crearPedidoDirecto(payload: {
        detalles: { productoId: number; cantidad: number; precioUnitario: number; observaciones: string }[];
        diasSeleccionados: string;
        esMensual: boolean;
        metodoPago: string;
    }): Observable<any> {
        return this.pedidoService.crearPedidoConDias(payload);
    }
}

