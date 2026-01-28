import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './producto.service';

export interface CartItem {
    producto: Producto;
    cantidad: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
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
        console.log('Carrito actualizado:', this.cartItems.value);
    }

    removeFromCart(productoId: number) {
        const currentItems = this.cartItems.value.filter(item => item.producto.id !== productoId);
        this.cartItems.next(currentItems);
    }

    clearCart() {
        this.cartItems.next([]);
    }

    getTotal(): number {
        return this.cartItems.value.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    }
}
