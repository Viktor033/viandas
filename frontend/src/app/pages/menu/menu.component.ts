import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    private productoService = inject(ProductoService);
    private cartService = inject(CartService);
    private pedidoService = inject(PedidoService);
    private authService = inject(AuthService);
    private uploadService = inject(UploadService);

    readonly DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    productos: Producto[] = [];
    isAdmin = false;
    isMakro = false;
    isUploading = false;
    showForm = false;
    showEditForm = false;

    // Tab activo
    tabActivo = 'Lunes';

    // Formulario nuevo producto
    newProduct: Partial<Producto> = {
        nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos', calorias: undefined
    };

    // Formulario editar producto
    editProduct: Producto = {
        nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos', calorias: undefined
    };

    // UI state para la selección de tipo de vianda y sin sal
    opcionTipo: { [id: number]: string } = {};
    opcionSinSal: { [id: number]: boolean } = {};

    // Espejo del carrito global
    itemsCarrito: CartItem[] = [];

    ngOnInit() {
        this.loadProductos();
        const userData = this.authService.getUserData();
        this.isAdmin = userData?.rol === 'ADMIN';
        this.isMakro = !!userData?.esMakro;

        // Escuchar el carrito
        this.cartService.cart$.subscribe(items => {
            this.itemsCarrito = items;
        });
    }

    loadProductos() {
        this.productoService.getProductos().subscribe({
            next: data => {
                this.productos = data;
                // Inicializar las opciones seleccionadas a "Standard"
                this.productos.forEach(p => {
                    if (p.id) {
                        this.opcionTipo[p.id] = this.opcionTipo[p.id] || 'Standard';
                        this.opcionSinSal[p.id] = this.opcionSinSal[p.id] || false;
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
        const tipo = this.opcionTipo[producto.id!] || 'Standard';
        const ss = this.opcionSinSal[producto.id!] ? ' Sin Sal' : '';
        const opcion = tipo + ss;
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
        const tipo = this.opcionTipo[producto.id!] || 'Standard';
        const ss = this.opcionSinSal[producto.id!] ? ' Sin Sal' : '';
        const opcion = tipo + ss;
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
                this.newProduct = { nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos', calorias: undefined };
                Swal.fire({
                    icon: 'success',
                    title: '✅ ¡Vianda agregada!',
                    text: 'El producto fue guardado correctamente.',
                    timer: 2500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    timerProgressBar: true,
                    background: 'var(--bg-card)',
                    color: 'var(--text-color)',
                    iconColor: '#edb110',
                });
            },
            error: err => {
                console.error(err);
                Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el producto.', timer: 2500, showConfirmButton: false });
            }
        });
    }

    getOpcionActual(productoId: number): string {
        const tipo = this.opcionTipo[productoId] || 'Standard';
        const ss = this.opcionSinSal[productoId] ? ' Sin Sal' : '';
        return tipo + ss;
    }
}
