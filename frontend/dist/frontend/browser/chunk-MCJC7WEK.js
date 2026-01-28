import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-H367MJE2.js";
import {
  CartService,
  NavbarComponent
} from "./chunk-CEKYT777.js";
import {
  AuthService,
  CommonModule,
  Component,
  DecimalPipe,
  EventEmitter,
  HttpClient,
  Injectable,
  Input,
  NgForOf,
  NgIf,
  Output,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JW6F55VQ.js";

// src/app/components/product-card/product-card.component.ts
function ProductCardComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ProductCardComponent_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdd());
    });
    \u0275\u0275text(1, " Agregar ");
    \u0275\u0275elementEnd();
  }
}
function ProductCardComponent_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function ProductCardComponent_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDelete());
    });
    \u0275\u0275text(1, " Eliminar ");
    \u0275\u0275elementEnd();
  }
}
var ProductCardComponent = class _ProductCardComponent {
  product;
  isAdmin = false;
  addToCart = new EventEmitter();
  deleteProduct = new EventEmitter();
  onAdd() {
    this.addToCart.emit(this.product);
  }
  onDelete() {
    if (this.product.id) {
      this.deleteProduct.emit(this.product.id);
    }
  }
  static \u0275fac = function ProductCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCardComponent, selectors: [["app-product-card"]], inputs: { product: "product", isAdmin: "isAdmin" }, outputs: { addToCart: "addToCart", deleteProduct: "deleteProduct" }, decls: 14, vars: 10, consts: [[1, "product-card"], [1, "image-container"], [3, "src", "alt"], [1, "card-details"], [1, "description"], [1, "price-row"], [1, "price"], ["class", "btn-add", 3, "click", 4, "ngIf"], ["class", "btn-delete", 3, "click", 4, "ngIf"], [1, "btn-add", 3, "click"], [1, "btn-delete", 3, "click"]], template: function ProductCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "h3");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "span", 6);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, ProductCardComponent_button_12_Template, 2, 0, "button", 7)(13, ProductCardComponent_button_13_Template, 2, 0, "button", 8);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.product.imagenUrl || "/assets/images/placeholder-food.png", \u0275\u0275sanitizeUrl)("alt", ctx.product.nombre);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.product.nombre);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.product.descripcion);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("$ ", \u0275\u0275pipeBind2(11, 7, ctx.product.precio, "1.0-0"), "");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.isAdmin);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isAdmin);
    }
  }, dependencies: [CommonModule, NgIf, DecimalPipe], styles: ["\n\n.product-card[_ngcontent-%COMP%] {\n  background: white;\n  background: rgba(40, 40, 40, 0.6);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(237, 177, 16, 0.1);\n  border-radius: 16px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  color: #f8edda;\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);\n  border-color: rgba(237, 177, 16, 0.4);\n}\n.product-card[_ngcontent-%COMP%]   .image-container[_ngcontent-%COMP%] {\n  height: 180px;\n  width: 100%;\n  overflow: hidden;\n}\n.product-card[_ngcontent-%COMP%]   .image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s ease;\n}\n.product-card[_ngcontent-%COMP%]:hover   .image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%] {\n  padding: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  color: #edb110;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: rgba(248, 237, 218, 0.7);\n  margin-bottom: 1rem;\n  flex-grow: 1;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: auto;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: #fff;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%] {\n  background: #edb110;\n  color: #0a332e;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%]:hover {\n  background: #ffca2c;\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   button.btn-delete[_ngcontent-%COMP%] {\n  background: rgba(220, 53, 69, 0.2);\n  color: #ff6b6b;\n  border: 1px solid rgba(220, 53, 69, 0.4);\n}\n.product-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   .price-row[_ngcontent-%COMP%]   button.btn-delete[_ngcontent-%COMP%]:hover {\n  background: rgba(220, 53, 69, 0.4);\n}\n/*# sourceMappingURL=product-card.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductCardComponent, [{
    type: Component,
    args: [{ selector: "app-product-card", standalone: true, imports: [CommonModule], template: `
    <div class="product-card">
      <div class="image-container">
        <img [src]="product.imagenUrl || '/assets/images/placeholder-food.png'" [alt]="product.nombre">
      </div>
      <div class="card-details">
        <h3>{{ product.nombre }}</h3>
        <p class="description">{{ product.descripcion }}</p>
        <div class="price-row">
          <span class="price">$ {{ product.precio | number:'1.0-0' }}</span>
          
          <button *ngIf="!isAdmin" (click)="onAdd()" class="btn-add">
            Agregar
          </button>
          
          <button *ngIf="isAdmin" (click)="onDelete()" class="btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;1670365186bb563bbec19fad726ea24d88ac6f24fd1b1c805168785c020bd351;C:/PROYECTOS/viandas/frontend/src/app/components/product-card/product-card.component.ts */\n.product-card {\n  background: white;\n  background: rgba(40, 40, 40, 0.6);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(237, 177, 16, 0.1);\n  border-radius: 16px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  color: #f8edda;\n}\n.product-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);\n  border-color: rgba(237, 177, 16, 0.4);\n}\n.product-card .image-container {\n  height: 180px;\n  width: 100%;\n  overflow: hidden;\n}\n.product-card .image-container img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s ease;\n}\n.product-card:hover .image-container img {\n  transform: scale(1.1);\n}\n.product-card .card-details {\n  padding: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n.product-card .card-details h3 {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.1rem;\n  color: #edb110;\n}\n.product-card .card-details .description {\n  font-size: 0.9rem;\n  color: rgba(248, 237, 218, 0.7);\n  margin-bottom: 1rem;\n  flex-grow: 1;\n}\n.product-card .card-details .price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: auto;\n}\n.product-card .card-details .price-row .price {\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: #fff;\n}\n.product-card .card-details .price-row button {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.product-card .card-details .price-row button.btn-add {\n  background: #edb110;\n  color: #0a332e;\n}\n.product-card .card-details .price-row button.btn-add:hover {\n  background: #ffca2c;\n}\n.product-card .card-details .price-row button.btn-delete {\n  background: rgba(220, 53, 69, 0.2);\n  color: #ff6b6b;\n  border: 1px solid rgba(220, 53, 69, 0.4);\n}\n.product-card .card-details .price-row button.btn-delete:hover {\n  background: rgba(220, 53, 69, 0.4);\n}\n/*# sourceMappingURL=product-card.component.css.map */\n"] }]
  }], null, { product: [{
    type: Input
  }], isAdmin: [{
    type: Input
  }], addToCart: [{
    type: Output
  }], deleteProduct: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCardComponent, { className: "ProductCardComponent", filePath: "src/app/components/product-card/product-card.component.ts", lineNumber: 125 });
})();

// src/app/services/producto.service.ts
var ProductoService = class _ProductoService {
  http = inject(HttpClient);
  apiUrl = "/api/productos";
  // Proxy configurado o URL completa
  getProductos() {
    return this.http.get(this.apiUrl);
  }
  createProducto(producto) {
    return this.http.post(this.apiUrl, producto);
  }
  deleteProducto(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function ProductoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductoService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductoService, factory: _ProductoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/services/upload.service.ts
var UploadService = class _UploadService {
  http = inject(HttpClient);
  apiUrl = "/api/upload";
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.apiUrl, formData);
  }
  static \u0275fac = function UploadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UploadService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UploadService, factory: _UploadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/menu/menu.component.ts
function MenuComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MenuComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleForm());
    });
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.showForm ? "Cancelar" : "Nuevo Producto", " ");
  }
}
function MenuComponent_div_8_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1, "Subiendo imagen...");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_8_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "p", 23);
    \u0275\u0275text(2, "Vista previa:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "img", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.newProduct.imagenUrl, \u0275\u0275sanitizeUrl);
  }
}
function MenuComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275listener("click", function MenuComponent_div_8_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleForm());
    });
    \u0275\u0275elementStart(1, "div", 10);
    \u0275\u0275listener("click", function MenuComponent_div_8_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "button", 11);
    \u0275\u0275listener("click", function MenuComponent_div_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleForm());
    });
    \u0275\u0275text(3, "\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 12);
    \u0275\u0275listener("ngSubmit", function MenuComponent_div_8_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmitProduct());
    });
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Cargar Nueva Vianda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13)(8, "label");
    \u0275\u0275text(9, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_8_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.nombre, $event) || (ctx_r1.newProduct.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 13)(12, "label");
    \u0275\u0275text(13, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 15);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_8_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.descripcion, $event) || (ctx_r1.newProduct.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 13)(16, "label");
    \u0275\u0275text(17, "Precio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_8_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newProduct.precio, $event) || (ctx_r1.newProduct.precio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 13)(20, "label");
    \u0275\u0275text(21, "Foto del Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 17);
    \u0275\u0275listener("change", function MenuComponent_div_8_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, MenuComponent_div_8_div_23_Template, 2, 0, "div", 18)(24, MenuComponent_div_8_div_24_Template, 4, 1, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 20);
    \u0275\u0275text(26, "Guardar Producto");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newProduct.precio);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.isUploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.newProduct.imagenUrl);
  }
}
function MenuComponent_app_product_card_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-product-card", 25);
    \u0275\u0275listener("addToCart", function MenuComponent_app_product_card_10_Template_app_product_card_addToCart_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToCart($event));
    })("deleteProduct", function MenuComponent_app_product_card_10_Template_app_product_card_deleteProduct_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteProduct($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prod_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("product", prod_r5)("isAdmin", ctx_r1.isAdmin);
  }
}
function MenuComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "p");
    \u0275\u0275text(2, "No hay productos disponibles en este momento.");
    \u0275\u0275elementEnd()();
  }
}
var MenuComponent = class _MenuComponent {
  productoService = inject(ProductoService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  uploadService = inject(UploadService);
  productos = [];
  isAdmin = false;
  isUploading = false;
  // Formulario nuevo producto
  showForm = false;
  newProduct = {
    nombre: "",
    descripcion: "",
    precio: 0,
    imagenUrl: "",
    activo: true
  };
  ngOnInit() {
    this.loadProductos();
    this.checkRole();
  }
  checkRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === "ADMIN";
  }
  loadProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error("Error cargando productos", err)
    });
  }
  addToCart(producto) {
    this.cartService.addToCart(producto);
    alert("Producto agregado al carrito");
  }
  deleteProduct(id) {
    if (confirm("\xBFEst\xE1s seguro de eliminar este producto?")) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.loadProductos();
      });
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.uploadService.uploadImage(file).subscribe({
        next: (res) => {
          this.newProduct.imagenUrl = res.url;
          this.isUploading = false;
        },
        error: (err) => {
          console.error("Error subiendo imagen", err);
          this.isUploading = false;
          alert("Error al subir la imagen");
        }
      });
    }
  }
  onSubmitProduct() {
    this.productoService.createProducto(this.newProduct).subscribe({
      next: (prod) => {
        console.log("Producto creado", prod);
        this.loadProductos();
        this.toggleForm();
        this.resetForm();
      },
      error: (err) => console.error(err)
    });
  }
  resetForm() {
    this.newProduct = {
      nombre: "",
      descripcion: "",
      precio: 0,
      imagenUrl: "",
      activo: true
    };
  }
  static \u0275fac = function MenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MenuComponent, selectors: [["app-menu"]], decls: 12, vars: 4, consts: [[1, "menu-container"], [1, "header-section"], ["class", "btn-create", 3, "click", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "products-grid"], [3, "product", "isAdmin", "addToCart", "deleteProduct", 4, "ngFor", "ngForOf"], ["class", "no-products", 4, "ngIf"], [1, "btn-create", 3, "click"], [1, "fas", "fa-plus"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "close-btn", 3, "click"], [1, "product-form", 3, "ngSubmit"], [1, "form-group"], ["name", "nombre", "required", "", "placeholder", "Ej: Milanesa con pur\xE9", 3, "ngModelChange", "ngModel"], ["name", "descripcion", "required", "", "placeholder", "Ingredientes, calor\xEDas, etc.", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "precio", "required", "", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/*", 2, "padding", "0.5rem", "border", "none", 3, "change"], ["style", "color: #edb110; font-size: 0.9rem;", 4, "ngIf"], ["style", "margin-top: 10px;", 4, "ngIf"], ["type", "submit", 1, "btn-submit"], [2, "color", "#edb110", "font-size", "0.9rem"], [2, "margin-top", "10px"], [2, "font-size", "0.8rem", "opacity", "0.7", "margin-bottom", "5px"], ["alt", "Preview", 2, "height", "100px", "border-radius", "8px", "border", "1px solid #edb110", 3, "src"], [3, "addToCart", "deleteProduct", "product", "isAdmin"], [1, "no-products"]], template: function MenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "h1");
      \u0275\u0275text(4, "Men\xFA de la Semana");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Eleg\xED tus viandas favoritas y arm\xE1 tu pedido.");
      \u0275\u0275elementEnd();
      \u0275\u0275template(7, MenuComponent_button_7_Template, 3, 1, "button", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, MenuComponent_div_8_Template, 27, 5, "div", 3);
      \u0275\u0275elementStart(9, "div", 4);
      \u0275\u0275template(10, MenuComponent_app_product_card_10_Template, 1, 2, "app-product-card", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, MenuComponent_div_11_Template, 3, 0, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.isAdmin);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showForm && ctx.isAdmin);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.productos);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.productos.length === 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, NavbarComponent, ProductCardComponent, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.menu-container[_ngcontent-%COMP%] {\n  padding-top: 100px;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.menu-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  z-index: 0;\n}\n.header-section[_ngcontent-%COMP%], \n.products-grid[_ngcontent-%COMP%], \n.admin-form-container[_ngcontent-%COMP%], \n.no-products[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n.header-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 3rem;\n}\n.header-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #edb110;\n  margin-bottom: 0.5rem;\n}\n.header-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(248, 237, 218, 0.8);\n  font-size: 1.1rem;\n}\n.header-section[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 0.8rem 1.5rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.header-section[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 2rem;\n  padding-bottom: 4rem;\n}\n.product-form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.product-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #edb110;\n  margin-bottom: 1.5rem;\n}\n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.2rem;\n}\n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: white;\n  box-sizing: border-box;\n}\n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #edb110;\n  background: rgba(255, 255, 255, 0.15);\n}\n.product-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.product-form[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  font-size: 1rem;\n  cursor: pointer;\n  margin-top: 1rem;\n}\n.product-form[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.1);\n}\n.no-products[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n}\n/*# sourceMappingURL=menu.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuComponent, [{
    type: Component,
    args: [{ selector: "app-menu", standalone: true, imports: [CommonModule, NavbarComponent, ProductCardComponent, FormsModule], template: `<app-navbar></app-navbar>\r
\r
<div class="menu-container">\r
    <div class="header-section">\r
        <h1>Men\xFA de la Semana</h1>\r
        <p>Eleg\xED tus viandas favoritas y arm\xE1 tu pedido.</p>\r
        \r
        <button *ngIf="isAdmin" class="btn-create" (click)="toggleForm()">\r
            <i class="fas fa-plus"></i> {{ showForm ? 'Cancelar' : 'Nuevo Producto' }}\r
        </button>\r
    </div>\r
\r
    <!-- Formulario de Admin (Modal) -->\r
    <div class="modal-overlay" *ngIf="showForm && isAdmin" (click)="toggleForm()">\r
        <div class="modal-content" (click)="$event.stopPropagation()">\r
            <button class="close-btn" (click)="toggleForm()">&times;</button>\r
            <form (ngSubmit)="onSubmitProduct()" class="product-form">\r
                <h3>Cargar Nueva Vianda</h3>\r
                \r
                <div class="form-group">\r
                    <label>Nombre</label>\r
                    <input [(ngModel)]="newProduct.nombre" name="nombre" required placeholder="Ej: Milanesa con pur\xE9">\r
                </div>\r
\r
                <div class="form-group">\r
                    <label>Descripci\xF3n</label>\r
                    <textarea [(ngModel)]="newProduct.descripcion" name="descripcion" required placeholder="Ingredientes, calor\xEDas, etc."></textarea>\r
                </div>\r
\r
                <div class="form-group">\r
                    <label>Precio</label>\r
                    <input type="number" [(ngModel)]="newProduct.precio" name="precio" required>\r
                </div>\r
\r
                <div class="form-group">\r
                    <label>Foto del Producto</label>\r
                    <input type="file" (change)="onFileSelected($event)" accept="image/*" style="padding: 0.5rem; border: none;">\r
                    \r
                    <div *ngIf="isUploading" style="color: #edb110; font-size: 0.9rem;">Subiendo imagen...</div>\r
                    \r
                    <div *ngIf="newProduct.imagenUrl" style="margin-top: 10px;">\r
                        <p style="font-size: 0.8rem; opacity: 0.7; margin-bottom: 5px;">Vista previa:</p>\r
                        <img [src]="newProduct.imagenUrl" alt="Preview" style="height: 100px; border-radius: 8px; border: 1px solid #edb110;">\r
                    </div>\r
                </div>\r
\r
                <button type="submit" class="btn-submit">Guardar Producto</button>\r
            </form>\r
        </div>\r
    </div>\r
\r
    <div class="products-grid">\r
        <app-product-card \r
            *ngFor="let prod of productos" \r
            [product]="prod" \r
            [isAdmin]="isAdmin"\r
            (addToCart)="addToCart($event)"\r
            (deleteProduct)="deleteProduct($event)">\r
        </app-product-card>\r
    </div>\r
\r
    <div *ngIf="productos.length === 0" class="no-products">\r
        <p>No hay productos disponibles en este momento.</p>\r
    </div>\r
</div>\r
`, styles: ['/* src/app/pages/menu/menu.component.scss */\n.menu-container {\n  padding-top: 100px;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.menu-container::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  z-index: 0;\n}\n.header-section,\n.products-grid,\n.admin-form-container,\n.no-products {\n  position: relative;\n  z-index: 1;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n.header-section {\n  text-align: center;\n  margin-bottom: 3rem;\n}\n.header-section h1 {\n  font-size: 2.5rem;\n  color: #edb110;\n  margin-bottom: 0.5rem;\n}\n.header-section p {\n  color: rgba(248, 237, 218, 0.8);\n  font-size: 1.1rem;\n}\n.header-section .btn-create {\n  margin-top: 1.5rem;\n  padding: 0.8rem 1.5rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.header-section .btn-create:hover {\n  transform: scale(1.05);\n}\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 2rem;\n  padding-bottom: 4rem;\n}\n.product-form {\n  width: 100%;\n}\n.product-form h3 {\n  text-align: center;\n  color: #edb110;\n  margin-bottom: 1.5rem;\n}\n.product-form .form-group {\n  margin-bottom: 1.2rem;\n}\n.product-form .form-group label {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n.product-form .form-group input,\n.product-form .form-group textarea {\n  width: 100%;\n  padding: 0.8rem;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: white;\n  box-sizing: border-box;\n}\n.product-form .form-group input:focus,\n.product-form .form-group textarea:focus {\n  outline: none;\n  border-color: #edb110;\n  background: rgba(255, 255, 255, 0.15);\n}\n.product-form .form-group textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.product-form .btn-submit {\n  width: 100%;\n  padding: 1rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  font-size: 1rem;\n  cursor: pointer;\n  margin-top: 1rem;\n}\n.product-form .btn-submit:hover {\n  filter: brightness(1.1);\n}\n.no-products {\n  text-align: center;\n  padding: 3rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n}\n/*# sourceMappingURL=menu.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MenuComponent, { className: "MenuComponent", filePath: "src/app/pages/menu/menu.component.ts", lineNumber: 19 });
})();
export {
  MenuComponent
};
//# sourceMappingURL=chunk-MCJC7WEK.js.map
