import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
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

  productos: Producto[] = [];
  loading = false;
  itemsCarrito: CartItem[] = [];
  isAdmin = false;

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

  async quickAdd() {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva Opción Makro',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre (ej: OPC 1 - Lasaña)">' +
        '<select id="swal-input2" class="swal2-input">' +
        '  <option value="Sabado">Sábado</option>' +
        '  <option value="Domingo">Domingo</option>' +
        '</select>' +
        '<input id="swal-input3" type="number" class="swal2-input" placeholder="Precio">',
      focusConfirm: false,
      background: '#1a1a1a',
      color: '#f8edda',
      confirmButtonColor: '#edb110',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLSelectElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value
        ]
      }
    });

    if (formValues) {
      const [nombre, dia, precio] = formValues;
      const nuevo: Producto = {
        nombre,
        dia,
        precio: Number(precio),
        activo: true,
        descripcion: 'Menú Fin de Semana Makro'
      };

      this.productoService.createProducto(nuevo).subscribe(() => {
        Swal.fire('Creado', 'Producto Makro agregado con éxito', 'success');
        this.loadProductos();
      });
    }
  }
}
