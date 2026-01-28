import {
  NavbarComponent,
  PedidoService
} from "./chunk-CEKYT777.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-JW6F55VQ.js";

// src/app/pages/mis-pedidos/mis-pedidos.component.ts
function MisPedidosComponent_div_8_li_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detalle_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", detalle_r1.cantidad, "x ", detalle_r1.producto.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("($", detalle_r1.precioUnitario, ")");
  }
}
function MisPedidosComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 9)(8, "ul");
    \u0275\u0275template(9, MisPedidosComponent_div_8_li_9_Template, 4, 3, "li", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 11)(11, "span", 12);
    \u0275\u0275text(12, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 13);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const pedido_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 5, pedido_r2.fecha, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", pedido_r2.estado);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pedido_r2.estado);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", pedido_r2.detalles);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("$", pedido_r2.total, "");
  }
}
function MisPedidosComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p");
    \u0275\u0275text(2, "A\xFAn no has realizado ning\xFAn pedido.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 16);
    \u0275\u0275text(4, "Ir al Men\xFA");
    \u0275\u0275elementEnd()();
  }
}
var MisPedidosComponent = class _MisPedidosComponent {
  pedidoService = inject(PedidoService);
  pedidos = [];
  ngOnInit() {
    this.pedidoService.getMisPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error("Error al cargar pedidos", err)
    });
  }
  static \u0275fac = function MisPedidosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MisPedidosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MisPedidosComponent, selectors: [["app-mis-pedidos"]], decls: 10, vars: 2, consts: [[1, "pedidos-container"], [1, "header"], [1, "pedidos-list"], ["class", "pedido-card", 4, "ngFor", "ngForOf"], ["class", "no-pedidos", 4, "ngIf"], [1, "pedido-card"], [1, "pedido-header"], [1, "fecha"], [1, "estado", 3, "ngClass"], [1, "pedido-body"], [4, "ngFor", "ngForOf"], [1, "pedido-footer"], [1, "total-label"], [1, "total-amount"], [1, "price"], [1, "no-pedidos"], ["routerLink", "/menu", 1, "btn-shop"]], template: function MisPedidosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "h1");
      \u0275\u0275text(4, "Mis Pedidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Historial de tus compras recientes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 2);
      \u0275\u0275template(8, MisPedidosComponent_div_8_Template, 15, 8, "div", 3)(9, MisPedidosComponent_div_9_Template, 5, 0, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngForOf", ctx.pedidos);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.pedidos.length === 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe, NavbarComponent], styles: ['\n\n.pedidos-container[_ngcontent-%COMP%] {\n  padding-top: 100px;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.pedidos-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  z-index: 0;\n}\n.header[_ngcontent-%COMP%], \n.pedidos-list[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #edb110;\n}\n.header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(248, 237, 218, 0.7);\n}\n.pedido-card[_ngcontent-%COMP%] {\n  background: rgba(40, 40, 40, 0.8);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(237, 177, 16, 0.2);\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  transition: transform 0.2s;\n}\n.pedido-card[_ngcontent-%COMP%]:hover {\n  border-color: #edb110;\n  transform: translateY(-2px);\n}\n.pedido-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 0.5rem;\n}\n.pedido-header[_ngcontent-%COMP%]   .fecha[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.pedido-header[_ngcontent-%COMP%]   .estado[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.8rem;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.pedido-header[_ngcontent-%COMP%]   .estado.PENDIENTE[_ngcontent-%COMP%] {\n  background: #ffc107;\n  color: #000;\n}\n.pedido-header[_ngcontent-%COMP%]   .estado.EN_PREPARACION[_ngcontent-%COMP%] {\n  background: #17a2b8;\n  color: #fff;\n}\n.pedido-header[_ngcontent-%COMP%]   .estado.ENTREGADO[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: #fff;\n}\n.pedido-header[_ngcontent-%COMP%]   .estado.CANCELADO[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: #fff;\n}\n.pedido-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.pedido-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  color: rgba(248, 237, 218, 0.9);\n}\n.pedido-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  color: #edb110;\n  font-size: 0.9rem;\n  margin-left: 0.5rem;\n}\n.pedido-footer[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  text-align: right;\n  font-size: 1.2rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 0.5rem;\n}\n.pedido-footer[_ngcontent-%COMP%]   .total-amount[_ngcontent-%COMP%] {\n  color: #edb110;\n  font-weight: bold;\n  margin-left: 0.5rem;\n}\n.no-pedidos[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n}\n.no-pedidos[_ngcontent-%COMP%]   .btn-shop[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 1rem;\n  padding: 0.8rem 1.5rem;\n  background: #edb110;\n  color: #0a332e;\n  text-decoration: none;\n  border-radius: 8px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=mis-pedidos.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MisPedidosComponent, [{
    type: Component,
    args: [{ selector: "app-mis-pedidos", standalone: true, imports: [CommonModule, NavbarComponent], template: '<app-navbar></app-navbar>\r\n\r\n<div class="pedidos-container">\r\n    <div class="header">\r\n        <h1>Mis Pedidos</h1>\r\n        <p>Historial de tus compras recientes</p>\r\n    </div>\r\n\r\n    <div class="pedidos-list">\r\n        <div *ngFor="let pedido of pedidos" class="pedido-card">\r\n            <div class="pedido-header">\r\n                <span class="fecha">{{ pedido.fecha | date:\'medium\' }}</span>\r\n                <span class="estado" [ngClass]="pedido.estado">{{ pedido.estado }}</span>\r\n            </div>\r\n            \r\n            <div class="pedido-body">\r\n                <ul>\r\n                    <li *ngFor="let detalle of pedido.detalles">\r\n                        {{ detalle.cantidad }}x {{ detalle.producto.nombre }} \r\n                        <span class="price">(${{ detalle.precioUnitario }})</span>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class="pedido-footer">\r\n                <span class="total-label">Total:</span>\r\n                <span class="total-amount">${{ pedido.total }}</span>\r\n            </div>\r\n        </div>\r\n\r\n        <div *ngIf="pedidos.length === 0" class="no-pedidos">\r\n            <p>A\xFAn no has realizado ning\xFAn pedido.</p>\r\n            <a routerLink="/menu" class="btn-shop">Ir al Men\xFA</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n', styles: ['/* src/app/pages/mis-pedidos/mis-pedidos.component.scss */\n.pedidos-container {\n  padding-top: 100px;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.pedidos-container::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  z-index: 0;\n}\n.header,\n.pedidos-list {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n.header {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.header h1 {\n  color: #edb110;\n}\n.header p {\n  color: rgba(248, 237, 218, 0.7);\n}\n.pedido-card {\n  background: rgba(40, 40, 40, 0.8);\n  backdrop-filter: blur(5px);\n  border: 1px solid rgba(237, 177, 16, 0.2);\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  transition: transform 0.2s;\n}\n.pedido-card:hover {\n  border-color: #edb110;\n  transform: translateY(-2px);\n}\n.pedido-header {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 0.5rem;\n}\n.pedido-header .fecha {\n  font-weight: bold;\n}\n.pedido-header .estado {\n  padding: 0.2rem 0.8rem;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.pedido-header .estado.PENDIENTE {\n  background: #ffc107;\n  color: #000;\n}\n.pedido-header .estado.EN_PREPARACION {\n  background: #17a2b8;\n  color: #fff;\n}\n.pedido-header .estado.ENTREGADO {\n  background: #28a745;\n  color: #fff;\n}\n.pedido-header .estado.CANCELADO {\n  background: #dc3545;\n  color: #fff;\n}\n.pedido-body ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.pedido-body ul li {\n  margin-bottom: 0.5rem;\n  color: rgba(248, 237, 218, 0.9);\n}\n.pedido-body ul li .price {\n  color: #edb110;\n  font-size: 0.9rem;\n  margin-left: 0.5rem;\n}\n.pedido-footer {\n  margin-top: 1rem;\n  text-align: right;\n  font-size: 1.2rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 0.5rem;\n}\n.pedido-footer .total-amount {\n  color: #edb110;\n  font-weight: bold;\n  margin-left: 0.5rem;\n}\n.no-pedidos {\n  text-align: center;\n  padding: 3rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n}\n.no-pedidos .btn-shop {\n  display: inline-block;\n  margin-top: 1rem;\n  padding: 0.8rem 1.5rem;\n  background: #edb110;\n  color: #0a332e;\n  text-decoration: none;\n  border-radius: 8px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=mis-pedidos.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MisPedidosComponent, { className: "MisPedidosComponent", filePath: "src/app/pages/mis-pedidos/mis-pedidos.component.ts", lineNumber: 13 });
})();
export {
  MisPedidosComponent
};
//# sourceMappingURL=chunk-UQUGWW3C.js.map
