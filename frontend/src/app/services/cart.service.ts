import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './producto.service';
import { PedidoService } from './pedido.service';

export interface CartItem {
    producto: Producto;
    cantidad: number;
    observaciones?: string; // Nuevo: Para 'Común' / 'Sin sal'
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private pedidoService = inject(PedidoService);
    private platformId = inject(PLATFORM_ID);
    
    private cartItems = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
    cart$ = this.cartItems.asObservable();

    private loadCartFromStorage(): CartItem[] {
        if (isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem('cart_items');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Error parsing cart from storage', e);
                    return [];
                }
            }
        }
        return [];
    }

    private saveCartToStorage(items: CartItem[]) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cart_items', JSON.stringify(items));
        }
    }

    addToCart(producto: Producto, observaciones: string = 'Común') {
        const currentItems = this.cartItems.value;
        // Buscamos si ya existe el mismo producto con la misma observación
        const existingItem = currentItems.find(item => 
            item.producto.id === producto.id && item.observaciones === observaciones
        );

        let newItems;
        if (existingItem) {
            existingItem.cantidad++;
            newItems = [...currentItems];
        } else {
            newItems = [...currentItems, { producto, cantidad: 1, observaciones }];
        }
        this.cartItems.next(newItems);
        this.saveCartToStorage(newItems);
    }

    decreaseQuantity(productoId: number, observaciones: string = 'Común') {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => 
            item.producto.id === productoId && item.observaciones === observaciones
        );
        if (existingItem) {
            if (existingItem.cantidad > 1) {
                existingItem.cantidad--;
                const newItems = [...currentItems];
                this.cartItems.next(newItems);
                this.saveCartToStorage(newItems);
            } else {
                this.removeFromCart(productoId, observaciones);
            }
        }
    }

    removeFromCart(productoId: number, observaciones?: string) {
        const newItems = this.cartItems.value.filter(item => {
            if (observaciones) {
                return !(item.producto.id === productoId && item.observaciones === observaciones);
            }
            return item.producto.id !== productoId;
        });
        this.cartItems.next(newItems);
        this.saveCartToStorage(newItems);
    }

    clearCart() { 
        this.cartItems.next([]); 
        this.saveCartToStorage([]);
    }

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

