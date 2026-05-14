import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-makro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './menu-makro.component.html',
  styleUrls: ['./menu-makro.component.scss']
})
export class MenuMakroComponent implements OnInit {
  private productoService = inject(ProductoService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private uploadService = inject(UploadService);

  productos: Producto[] = [];
  loading = false;
  itemsCarrito: CartItem[] = [];
  isAdmin = false;
  
  // Edición y Creación
  showEditForm = false;
  showAddForm = false;
  isUploading = false;
  editProduct: Producto = { nombre: '', descripcion: '', precio: 0, activo: true, dia: 'Sabado' };
  newProduct: Producto = { nombre: '', descripcion: 'Menú Fin de Semana Makro', precio: 0, activo: true, dia: 'Sabado', imagenUrl: '' };

  // Filtros de día
  diasWeekend = ['Sabado', 'Domingo'];
  tabActivo = 'Sabado';

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadProductos();
    this.cartService.cart$.subscribe(items => {
      this.itemsCarrito = items;
    });
  }

  loadProductos() {
    this.loading = true;
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.filter(p => p.dia === 'Sabado' || p.dia === 'Domingo');
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  get productosDia(): Producto[] {
    return this.productos.filter(p => p.dia === this.tabActivo && p.activo);
  }

  getCantidad(productoId: number): number {
    const item = this.itemsCarrito.find(i => i.producto.id === productoId);
    return item ? item.cantidad : 0;
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto, 'Makro Wholesale');
    
    Swal.fire({
      title: '✅ Agregado',
      text: `${producto.nombre} agregado al pedido Makro`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#1a1a1a',
      color: '#f8edda'
    });
  }

  quitarDelCarrito(productoId: number) {
    this.cartService.decreaseQuantity(productoId, 'Makro Wholesale');
  }

  get totalCarrito(): number {
    return this.itemsCarrito
      .filter(i => i.observaciones === 'Makro Wholesale')
      .reduce((sum, i) => sum + i.cantidad * i.producto.precio, 0);
  }

  // --- CREACIÓN ---
  
  openAdd() {
    this.newProduct = { 
      nombre: '', 
      descripcion: 'Menú Fin de Semana Makro', 
      precio: 0, 
      activo: true, 
      dia: this.tabActivo, 
      imagenUrl: '' 
    };
    this.showAddForm = true;
  }

  onFileSelectedAdd(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.uploadService.uploadImage(file).subscribe({
        next: res => { 
          this.newProduct.imagenUrl = res.url; 
          this.isUploading = false; 
        },
        error: () => { 
          this.isUploading = false; 
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      });
    }
  }

  onSubmitAdd() {
    this.productoService.createProducto(this.newProduct).subscribe({
      next: () => {
        this.loadProductos();
        this.showAddForm = false;
        Swal.fire({ 
          icon: 'success', 
          title: 'Opción Creada', 
          text: 'El plato se agregó al menú Makro',
          background: '#1a1a1a', 
          color: '#f8edda', 
          timer: 2000, 
          showConfirmButton: false 
        });
      },
      error: (err) => console.error(err)
    });
  }

  // --- EDICIÓN ---
  
  openEdit(prod: Producto) {
    this.editProduct = { ...prod };
    this.showEditForm = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.uploadService.uploadImage(file).subscribe({
        next: res => { 
          this.editProduct.imagenUrl = res.url; 
          this.isUploading = false; 
        },
        error: () => { 
          this.isUploading = false; 
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      });
    }
  }

  onSubmitEdit() {
    if (!this.editProduct.id) return;
    this.productoService.updateProducto(this.editProduct.id, this.editProduct).subscribe({
      next: () => {
        this.loadProductos();
        this.showEditForm = false;
        Swal.fire({ icon: 'success', title: 'Actualizado', background: '#1a1a1a', color: '#f8edda', timer: 1500, showConfirmButton: false });
      },
      error: (err) => console.error(err)
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar Opción?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff6b6b',
      confirmButtonText: 'Sí, eliminar',
      background: '#1a1a1a',
      color: '#f8edda'
    }).then(r => {
      if (r.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe({
          next: () => {
            this.loadProductos();
            Swal.fire({ icon: 'success', title: 'Eliminado', background: '#1a1a1a', color: '#f8edda', timer: 1500, showConfirmButton: false });
          },
          error: err => console.error(err)
        });
      }
    });
  }
}
