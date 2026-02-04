import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, NavbarComponent, ProductCardComponent, FormsModule],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    private productoService = inject(ProductoService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private uploadService = inject(UploadService);

    productos: Producto[] = [];
    isAdmin: boolean = false;
    isUploading: boolean = false;

    // Formulario nuevo producto
    showForm: boolean = false;
    newProduct: Producto = {
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenUrl: '',
        activo: true
    };

    ngOnInit() {
        this.loadProductos();
        this.checkRole();
    }

    checkRole() {
        const role = this.authService.getUserRole();
        this.isAdmin = role === 'ADMIN';
    }

    loadProductos() {
        this.productoService.getProductos().subscribe({
            next: (data) => this.productos = data,
            error: (err) => console.error('Error cargando productos', err)
        });
    }

    addToCart(producto: Producto) {
        this.cartService.addToCart(producto);
        Swal.fire({
            title: '¡Agregado!',
            text: `${producto.nombre} se agregó al carrito`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#1a1a1a',
            color: '#f8edda',
            iconColor: '#edb110',
            customClass: {
                popup: 'swal-custom-toast'
            }
        });
    }

    deleteProduct(id: number) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            this.productoService.deleteProducto(id).subscribe(() => {
                this.loadProductos();
            });
        }
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.isUploading = true;
            this.uploadService.uploadImage(file).subscribe({
                next: (res) => {
                    this.newProduct.imagenUrl = res.url;
                    this.isUploading = false;
                },
                error: (err) => {
                    console.error('Error subiendo imagen', err);
                    this.isUploading = false;
                    alert('Error al subir la imagen');
                }
            });
        }
    }

    onSubmitProduct() {
        this.productoService.createProducto(this.newProduct).subscribe({
            next: (prod) => {
                console.log('Producto creado', prod);
                this.loadProductos();
                this.toggleForm();
                this.resetForm();
            },
            error: (err) => console.error(err)
        });
    }

    resetForm() {
        this.newProduct = {
            nombre: '',
            descripcion: '',
            precio: 0,
            imagenUrl: '',
            activo: true
        };
    }
}
