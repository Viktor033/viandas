import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

export interface ItemSeleccionado {
    producto: Producto;
    cantidad: number;
    observaciones: string;
    esNormal: boolean;
}

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, FormsModule, NavbarComponent],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    private productoService = inject(ProductoService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private uploadService = inject(UploadService);

    readonly DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    productos: Producto[] = [];
    isAdmin = false;
    isUploading = false;
    showForm = false;

    // Tab activo
    tabActivo = 'Lunes';

    // Mapa de selección: productoId -> ItemSeleccionado
    seleccion: Map<number, ItemSeleccionado> = new Map();

    // Días del pedido seleccionados
    diasPedido: { [dia: string]: boolean } = {
        Lunes: false, Martes: false, Miércoles: false, Jueves: false, Viernes: false
    };
    esMensual = false;

    // Formulario admin
    newProduct: Partial<Producto> = {
        nombre: '', descripcion: '', precio: 0, imagenUrl: '', activo: true, dia: 'Todos'
    };

    ngOnInit() {
        this.loadProductos();
        this.isAdmin = this.authService.getUserRole() === 'ADMIN';
    }

    loadProductos() {
        this.productoService.getProductos().subscribe({
            next: data => this.productos = data,
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
    getItem(producto: Producto): ItemSeleccionado {
        if (!this.seleccion.has(producto.id!)) {
            this.seleccion.set(producto.id!, {
                producto,
                cantidad: 0,
                observaciones: '',
                esNormal: true
            });
        }
        return this.seleccion.get(producto.id!)!;
    }

    incrementar(producto: Producto) {
        const item = this.getItem(producto);
        item.cantidad++;
    }

    decrementar(producto: Producto) {
        const item = this.getItem(producto);
        if (item.cantidad > 0) item.cantidad--;
    }

    get itemsSeleccionados(): ItemSeleccionado[] {
        return Array.from(this.seleccion.values()).filter(i => i.cantidad > 0);
    }

    get totalCarrito(): number {
        return this.itemsSeleccionados.reduce(
            (sum, i) => sum + i.cantidad * i.producto.precio, 0
        );
    }

    get haySeleccion(): boolean {
        return this.itemsSeleccionados.length > 0;
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
            observaciones: i.esNormal ? 'Normal' : (i.observaciones || '')
        }));

        const payload = {
            detalles: items,
            diasSeleccionados: this.diasSeleccionadosList.join(','),
            esMensual: this.esMensual,
            metodoPago: 'EFECTIVO'
        };

        this.cartService.crearPedidoDirecto(payload).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Pedido enviado!',
                    text: this.esMensual ? 'Tu pedido mensual fue registrado.' : `Tu pedido para ${this.diasSeleccionadosList.join(', ')} fue registrado.`,
                    confirmButtonColor: '#edb110'
                });
                this.seleccion.clear();
                this.DIAS.forEach(d => this.diasPedido[d] = false);
                this.esMensual = false;
            },
            error: (err: any) => {
                console.error(err);
                Swal.fire('Error', 'No se pudo registrar el pedido.', 'error');
            }
        });
    }

    // ——— Admin ———
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
