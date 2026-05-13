import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductoService, Producto } from '../../services/producto.service';
import { PedidoService, ResumenSemanal } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-makro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './admin-makro.component.html',
  styleUrls: ['./admin-makro.component.scss']
})
export class AdminMakroComponent implements OnInit {
  private productoService = inject(ProductoService);
  private pedidoService = inject(PedidoService);

  productos: Producto[] = [];
  makroProducts: Producto[] = [];
  resumen?: ResumenSemanal;
  
  loading = false;
  opcionesMakro = ['OPC 1', 'OPC 2', 'OPC 3', 'EXTRA'];
  diasWeekend = ['Sabado', 'Domingo'];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.makroProducts = data.filter(p => p.dia === 'Sabado' || p.dia === 'Domingo');
      this.loading = false;
    });

    this.pedidoService.getResumenSemanal().subscribe(data => {
      this.resumen = data;
    });
  }

  getFinSemanaCount(op: string, dia: string) {
    return this.resumen?.totalesFinSemana[op]?.[dia] || 0;
  }

  // Lógica para crear/editar productos Makro simplificada
  async agregarMakro() {
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
        this.loadData();
      });
    }
  }

  toggleActivo(p: Producto) {
    p.activo = !p.activo;
    this.productoService.updateProducto(p.id!, p).subscribe();
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      background: '#1a1a1a',
      color: '#f8edda'
    }).then(result => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }
}
