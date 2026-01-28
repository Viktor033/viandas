import {
  NavbarComponent
} from "./chunk-CEKYT777.js";
import {
  AuthService,
  CommonModule,
  Component,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-JW6F55VQ.js";

// src/app/pages/home/home.component.ts
function HomeComponent_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Tu rol es: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.userRole);
  }
}
var HomeComponent = class _HomeComponent {
  authService = inject(AuthService);
  userRole = "";
  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }
  logout() {
    this.authService.logout();
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 16, vars: 1, consts: [[1, "home-container"], [1, "main-content"], [1, "welcome-card"], [4, "ngIf"], [1, "logout-btn", 3, "click"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "h1");
      \u0275\u0275text(4, "Bienvenido al Panel Principal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Sistema de Gesti\xF3n de Viandas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "main")(8, "div", 2)(9, "h2");
      \u0275\u0275text(10, "Panel Principal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p");
      \u0275\u0275text(12, "Has iniciado sesi\xF3n correctamente.");
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, HomeComponent_p_13_Template, 4, 1, "p", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 4);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_14_listener() {
        return ctx.logout();
      });
      \u0275\u0275text(15, "Cerrar Sesi\xF3n");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.userRole);
    }
  }, dependencies: [CommonModule, NgIf, NavbarComponent], styles: ['\n\n.home-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding-top: 100px;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.home-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 0;\n}\n.main-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  margin-bottom: 2rem;\n}\nheader[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\nheader[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n.welcome-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  margin-bottom: 1.5rem;\n  text-align: center;\n  min-width: 300px;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.3s;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background-color: #c82333;\n}\n/*# sourceMappingURL=home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [CommonModule, NavbarComponent], template: '<app-navbar></app-navbar>\r\n\r\n<div class="home-container">\r\n    <div class="main-content">\r\n        <h1>Bienvenido al Panel Principal</h1>\r\n        <p>Sistema de Gesti\xF3n de Viandas</p>\r\n\r\n    <main>\r\n        <div class="welcome-card">\r\n            <h2>Panel Principal</h2>\r\n            <p>Has iniciado sesi\xF3n correctamente.</p>\r\n            <p *ngIf="userRole">Tu rol es: <strong>{{ userRole }}</strong></p>\r\n        </div>\r\n        \r\n        <button (click)="logout()" class="logout-btn">Cerrar Sesi\xF3n</button>\r\n    </main>\r\n</div>\r\n', styles: ['/* src/app/pages/home/home.component.scss */\n.home-container {\n  min-height: 100vh;\n  padding-top: 100px;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: "Segoe UI", sans-serif;\n  color: #f8edda;\n}\n.home-container::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 0;\n}\n.main-content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  margin-bottom: 2rem;\n}\nheader {\n  text-align: center;\n  margin-bottom: 2rem;\n}\nheader h1 {\n  color: #333;\n  margin: 0;\n}\nheader p {\n  color: #666;\n}\n.welcome-card {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  margin-bottom: 1.5rem;\n  text-align: center;\n  min-width: 300px;\n}\n.logout-btn {\n  background-color: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.3s;\n}\n.logout-btn:hover {\n  background-color: #c82333;\n}\n/*# sourceMappingURL=home.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/pages/home/home.component.ts", lineNumber: 14 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-EN24UEMJ.js.map
