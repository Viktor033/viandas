import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { CartService, CartItem } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    readonly DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    productos: Producto[] = [];
    isAdmin = false;
    isUploading = false;
    showForm = false;
    showEditForm = false;

    // Tab activo
    tabActivo = 'Lunes';

    // Días del pedido seleccionados
    diasPedido: { [dia: string]: boolean } = {
        Lunes: false, Martes: false, Miércoles: false, Jueves: false, Viernes: false
    };
    esMensual = false;
    
    // Método de pago para el pedido directo
    selectedPaymentMethod = 'EFECTIVO';
    isProcessing = false;

    // Formulario nuevo producto
    newProduct: Partial<Producto> = {
        nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos'
    };

    // Formulario editar producto
    editProduct: Producto = {
        nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos'
    };

    // UI state para la opción de vianda en cada producto
    opcionSeleccionada: { [id: number]: string } = {};

    // Espejo del carrito global
    itemsCarrito: CartItem[] = [];

    ngOnInit() {
        this.loadProductos();
        this.isAdmin = this.authService.getUserRole() === 'ADMIN';

        // Escuchar el carrito
        this.cartService.cart$.subscribe(items => {
            this.itemsCarrito = items;
        });
    }

    loadProductos() {
        this.productoService.getProductos().subscribe({
            next: data => {
                this.productos = data;
                // Inicializar las opciones seleccionadas a "Común"
                this.productos.forEach(p => {
                    if (p.id) {
                        this.opcionSeleccionada[p.id] = this.opcionSeleccionada[p.id] || 'Común';
                    }
                });
            },
            error: err => console.error('Error cargando productos', err)
        });
    }

    // Productos del tab activo (incluye los de "Todos")
    get productosDia(): Producto[] {
        return this.productos.filter(p =>
            (p.dia === this.tabActivo || p.dia === 'Todos') && p.activo
        );
    }

    // ——— Selección de items ———
    getCantidad(productoId: number, opcion: string): number {
        const item = this.itemsCarrito.find(i => i.producto.id === productoId && i.observaciones === opcion);
        return item ? item.cantidad : 0;
    }

    incrementar(producto: Producto) {
        const opcion = this.opcionSeleccionada[producto.id!] || 'Común';
        const wasZero = this.getCantidad(producto.id!, opcion) === 0;

        // Llamar al servicio global
        this.cartService.addToCart(producto, opcion);
        
        if (wasZero) {
            Swal.fire({
                title: '✅ ¡Vianda agregada!',
                text: `${producto.nombre} — ${opcion}`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: 'var(--bg-card)',
                color: 'var(--text-color)',
                iconColor: '#edb110',
            });
        }
    }

    decrementar(producto: Producto) {
        const opcion = this.opcionSeleccionada[producto.id!] || 'Común';
        if (this.getCantidad(producto.id!, opcion) > 0) {
            this.cartService.decreaseQuantity(producto.id!, opcion);
        }
    }

    get itemsSeleccionados(): CartItem[] {
        return this.itemsCarrito.filter(i => i.cantidad > 0);
    }

    get totalCarrito(): number {
        return this.itemsCarrito.reduce(
            (sum, i) => sum + i.cantidad * i.producto.precio, 0
        );
    }

    get haySeleccion(): boolean {
        return this.itemsCarrito.length > 0;
    }

    // ——— Días del pedido ———
    toggleTodoElMes() {
        this.esMensual = !this.esMensual;
        if (this.esMensual) {
            // seleccionar todos los días
            this.DIAS.forEach(d => this.diasPedido[d] = true);
        }
    }

    get diasSeleccionadosList(): string[] {
        return this.DIAS.filter(d => this.diasPedido[d]);
    }

    // ——— Confirmar pedido ———
    confirmarPedido() {
        if (!this.haySeleccion) {
            Swal.fire('Sin productos', 'Elegí al menos un producto.', 'warning');
            return;
        }
        if (this.diasSeleccionadosList.length === 0 && !this.esMensual) {
            Swal.fire('Sin días', 'Seleccioná al menos un día para el pedido.', 'warning');
            return;
        }

        const items = this.itemsSeleccionados.map(i => ({
            productoId: i.producto.id!,
            cantidad: i.cantidad,
            precioUnitario: i.producto.precio,
            observaciones: i.observaciones || 'Común'
        }));

        const payload = {
            detalles: items,
            diasSeleccionados: this.diasSeleccionadosList.join(','),
            esMensual: this.esMensual,
            metodoPago: this.selectedPaymentMethod
        };

        this.isProcessing = true;

        if (this.selectedPaymentMethod === 'MERCADOPAGO' || this.selectedPaymentMethod === 'TARJETA') {
            this.pedidoService.createPreferenceMPConDias(payload).subscribe({
                next: (res) => {
                    // Limpiar carrito antes de redirigir
                    this.cartService.clearCart();
                    window.location.href = res.init_point;
                },
                error: (err) => {
                    console.error('Error MP:', err);
                    Swal.fire('Error MP', 'No se pudo generar el link de pago.', 'error');
                    this.isProcessing = false;
                }
            });
            return;
        }

        this.cartService.crearPedidoDirecto(payload).subscribe({
            next: () => {
                if (this.selectedPaymentMethod === 'TRANSFERENCIA') {
                    Swal.fire({
                        title: '¡Pedido Confirmado!',
                        html: `
                            <p style="margin-bottom: 15px;">Tu pedido ha sido registrado. Para finalizar, realiza la transferencia a:</p>
                            <div style="background: #333; padding: 10px; border-radius: 8px; text-align: left; font-size: 0.9em; color: #fff;">
                                <p><strong>Alias:</strong> MANOPLAS.MP</p>
                                <p><strong>CVU:</strong> 0000003100047556076615</p>
                                <p><strong>Banco:</strong> Mercado Pago</p>
                                <p><strong>Titular:</strong> Ana Paula Gonzalez</p>
                            </div>
                            <p style="margin-top: 15px; font-size: 0.9em; color: #edb110;">
                                <i class="fab fa-whatsapp"></i> Compartí el comprobante por WhatsApp al <strong>3794908091</strong> y se procederá con su pedido.
                            </p>
                        `,
                        icon: 'info',
                        showCloseButton: true,
                        confirmButtonColor: '#25D366',
                        confirmButtonText: 'Entendido, enviar comprobante'
                    }).then((result) => {
                        this.cartService.clearCart(); // Limpiar carrito global
                        this.DIAS.forEach(d => this.diasPedido[d] = false);
                        this.esMensual = false;
                        this.isProcessing = false;

                        if (result.isConfirmed) {
                            window.open('https://wa.me/5493794908091?text=Hola,%20adjunto%20comprobante%20de%20transferencia%20para%20mi%20pedido.', '_blank');
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Pedido enviado!',
                        text: this.esMensual ? 'Tu pedido mensual fue registrado.' : `Tu pedido para ${this.diasSeleccionadosList.join(', ')} fue registrado.`,
                        confirmButtonColor: '#edb110'
                    }).then(() => {
                        this.cartService.clearCart(); // Limpiar carrito global
                        this.DIAS.forEach(d => this.diasPedido[d] = false);
                        this.esMensual = false;
                        this.isProcessing = false;
                    });
                }
            },
            error: (err: any) => {
                console.error(err);
                Swal.fire('Error', 'No se pudo registrar el pedido.', 'error');
                this.isProcessing = false;
            }
        });
    }

    // ——— Admin ———
    openEdit(prod: Producto) {
        this.editProduct = { ...prod };
        this.showEditForm = true;
    }

    onSubmitEdit() {
        if (!this.editProduct.id) return;
        this.productoService.updateProducto(this.editProduct.id, this.editProduct).subscribe({
            next: () => {
                this.loadProductos();
                this.showEditForm = false;
                Swal.fire({ icon: 'success', title: 'Producto actualizado', timer: 1500, showConfirmButton: false });
            },
            error: (err: any) => console.error(err)
        });
    }

    onFileSelectedEdit(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.isUploading = true;
            this.uploadService.uploadImage(file).subscribe({
                next: res => { this.editProduct.imagenUrl = res.url; this.isUploading = false; },
                error: () => { this.isUploading = false; alert('Error al subir imagen'); }
            });
        }
    }

    deleteProduct(id: number) {
        Swal.fire({
            title: '¿Eliminar Producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff6b6b',
            confirmButtonText: 'Eliminar'
        }).then(r => {
            if (r.isConfirmed) {
                this.productoService.deleteProducto(id).subscribe({
                    next: () => this.loadProductos(),
                    error: err => console.error(err)
                });
            }
        });
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.isUploading = true;
            this.uploadService.uploadImage(file).subscribe({
                next: res => { this.newProduct.imagenUrl = res.url; this.isUploading = false; },
                error: () => { this.isUploading = false; alert('Error al subir imagen'); }
            });
        }
    }

    onSubmitProduct() {
        this.productoService.createProducto(this.newProduct as Producto).subscribe({
            next: () => {
                this.loadProductos();
                this.showForm = false;
                this.newProduct = { nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos' };
            },
            error: err => console.error(err)
        });
    }
}
