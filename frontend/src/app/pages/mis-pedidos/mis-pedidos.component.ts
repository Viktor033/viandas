import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PedidoService, Pedido } from '../../services/pedido.service';

@Component({
    selector: 'app-mis-pedidos',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './mis-pedidos.component.html',
    styleUrls: ['./mis-pedidos.component.scss']
})
export class MisPedidosComponent {
    private pedidoService = inject(PedidoService);
    pedidos: Pedido[] = [];

    ngOnInit() {
        this.pedidoService.getMisPedidos().subscribe({
            next: (data) => this.pedidos = data,
            error: (err) => console.error('Error al cargar pedidos', err)
        });
    }
}
