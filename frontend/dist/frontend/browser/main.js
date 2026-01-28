import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-H367MJE2.js";
import {
  AuthService,
  CommonModule,
  Component,
  NgIf,
  Router,
  RouterOutlet,
  bootstrapApplication,
  inject,
  provideHttpClient,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JW6F55VQ.js";

// src/app/pages/auth/login/login.component.ts
function LoginComponent_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "INGRESAR");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275text(2, " PROCESANDO...");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  phone = "";
  loading = false;
  router = inject(Router);
  authService = inject(AuthService);
  onSubmit() {
    if (!this.phone) {
      alert("Por favor ingresa un n\xFAmero de celular.");
      return;
    }
    this.loading = true;
    this.authService.login(this.phone).add(() => {
      this.loading = false;
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 18, vars: 4, consts: [[1, "login-container"], [1, "login-card"], [1, "card-content"], [1, "logo"], ["src", "/assets/images/logonew.png", "alt", "Manoplas Logo"], [1, "subtitle"], [3, "ngSubmit"], [1, "input-group"], [1, "fas", "fa-phone-alt", "input-icon"], ["type", "tel", "name", "phone", "placeholder", "Ej: 11 1234 5678", "required", "", "autocomplete", "tel", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn-login", 3, "disabled"], [4, "ngIf"], [1, "footer-text"], [1, "fas", "fa-spinner", "fa-spin"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h3");
      \u0275\u0275text(6, "Acceso al Sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Ingres\xE1 tu celular para continuar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "form", 6);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "i", 8);
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.phone, $event) || (ctx.phone = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 10);
      \u0275\u0275template(14, LoginComponent_span_14_Template, 2, 0, "span", 11)(15, LoginComponent_span_15_Template, 3, 0, "span", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p", 12);
      \u0275\u0275text(17, "Manoplas \xA9 2026. Todos los derechos reservados.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.phone);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-position: center;\n  position: relative;\n}\n[_nghost-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(3px);\n}\n.login-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.login-card[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 420px;\n  background: rgba(80, 80, 80, 0.4);\n  backdrop-filter: blur(15px);\n  -webkit-backdrop-filter: blur(15px);\n  border: 1px solid rgba(237, 177, 16, 0.3);\n  border-radius: 24px;\n  padding: 3px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);\n  overflow: hidden;\n  margin: 0 auto;\n}\n.card-content[_ngcontent-%COMP%] {\n  position: relative;\n  background: transparent;\n  border-radius: 20px;\n  padding: 3rem 2.5rem;\n  text-align: center;\n  color: #f8edda;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.logo[_ngcontent-%COMP%] {\n  margin-bottom: 0rem;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 180px;\n  width: auto;\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  color: #f8edda;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: rgba(248, 237, 218, 0.7);\n  font-size: 0.95rem;\n  margin-bottom: 2.5rem;\n  line-height: 1.5;\n}\n.input-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 1.8rem;\n  width: 100%;\n}\n.input-group[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #edb110;\n  font-size: 1.2rem;\n  opacity: 0.9;\n  z-index: 2;\n}\n.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.1rem 1.1rem 1.1rem 3.5rem;\n  background: #ffffff;\n  border: 2px solid rgba(237, 177, 16, 0.4);\n  border-radius: 14px;\n  color: #000000;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n  box-sizing: border-box;\n}\n.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(0, 0, 0, 0.5);\n}\n.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  background: #fff;\n  border-color: #edb110;\n  box-shadow: 0 0 0 3px rgba(237, 177, 16, 0.2);\n}\n.btn-login[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.1rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 14px;\n  font-size: 1.05rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  letter-spacing: 0.5px;\n  margin-top: 1rem;\n  box-shadow: 0 4px 15px rgba(237, 177, 16, 0.3);\n}\n.btn-login[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(237, 177, 16, 0.4);\n  filter: brightness(1.1);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  background: #444;\n  color: #888;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.footer-text[_ngcontent-%COMP%] {\n  margin-top: 2.5rem;\n  font-size: 0.85rem;\n  color: rgba(248, 237, 218, 0.4);\n  border-top: 1px solid rgba(248, 237, 218, 0.1);\n  padding-top: 1.5rem;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="login-container">\r\n  <div class="login-card">\r\n    <!-- Removed card-glow for cleaner glass look -->\r\n    <div class="card-content">\r\n      <div class="logo">\r\n        <img src="/assets/images/logonew.png" alt="Manoplas Logo">\r\n      </div>\r\n      \r\n      <h3>Acceso al Sistema</h3>\r\n      <p class="subtitle">Ingres\xE1 tu celular para continuar</p>\r\n\r\n      <form (ngSubmit)="onSubmit()">\r\n        <div class="input-group">\r\n          <i class="fas fa-phone-alt input-icon"></i>\r\n          <input \r\n            type="tel" \r\n            [(ngModel)]="phone" \r\n            name="phone"\r\n            placeholder="Ej: 11 1234 5678" \r\n            required\r\n            autocomplete="tel"\r\n          >\r\n        </div>\r\n\r\n        <button type="submit" class="btn-login" [disabled]="loading">\r\n          <span *ngIf="!loading">INGRESAR</span>\r\n          <span *ngIf="loading"><i class="fas fa-spinner fa-spin"></i> PROCESANDO...</span>\r\n        </button>\r\n      </form>\r\n\r\n      <p class="footer-text">Manoplas &copy; 2026. Todos los derechos reservados.</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: ['/* src/app/pages/auth/login/login.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background-image: url(/assets/images/login-bg.png);\n  background-size: cover;\n  background-position: center;\n  position: relative;\n}\n:host::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(3px);\n}\n.login-container {\n  position: relative;\n  z-index: 2;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n* {\n  box-sizing: border-box;\n}\n.login-card {\n  position: relative;\n  width: 100%;\n  max-width: 420px;\n  background: rgba(80, 80, 80, 0.4);\n  backdrop-filter: blur(15px);\n  -webkit-backdrop-filter: blur(15px);\n  border: 1px solid rgba(237, 177, 16, 0.3);\n  border-radius: 24px;\n  padding: 3px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);\n  overflow: hidden;\n  margin: 0 auto;\n}\n.card-content {\n  position: relative;\n  background: transparent;\n  border-radius: 20px;\n  padding: 3rem 2.5rem;\n  text-align: center;\n  color: #f8edda;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.card-content form {\n  width: 100%;\n}\n.logo {\n  margin-bottom: 0rem;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n.logo img {\n  height: 180px;\n  width: auto;\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\n}\nh3 {\n  font-size: 1.2rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  color: #f8edda;\n}\n.subtitle {\n  color: rgba(248, 237, 218, 0.7);\n  font-size: 0.95rem;\n  margin-bottom: 2.5rem;\n  line-height: 1.5;\n}\n.input-group {\n  position: relative;\n  margin-bottom: 1.8rem;\n  width: 100%;\n}\n.input-group .input-icon {\n  position: absolute;\n  left: 18px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #edb110;\n  font-size: 1.2rem;\n  opacity: 0.9;\n  z-index: 2;\n}\n.input-group input {\n  width: 100%;\n  padding: 1.1rem 1.1rem 1.1rem 3.5rem;\n  background: #ffffff;\n  border: 2px solid rgba(237, 177, 16, 0.4);\n  border-radius: 14px;\n  color: #000000;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n  box-sizing: border-box;\n}\n.input-group input::placeholder {\n  color: rgba(0, 0, 0, 0.5);\n}\n.input-group input:focus {\n  background: #fff;\n  border-color: #edb110;\n  box-shadow: 0 0 0 3px rgba(237, 177, 16, 0.2);\n}\n.btn-login {\n  width: 100%;\n  padding: 1.1rem;\n  background: #edb110;\n  color: #0a332e;\n  border: none;\n  border-radius: 14px;\n  font-size: 1.05rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  letter-spacing: 0.5px;\n  margin-top: 1rem;\n  box-shadow: 0 4px 15px rgba(237, 177, 16, 0.3);\n}\n.btn-login:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(237, 177, 16, 0.4);\n  filter: brightness(1.1);\n}\n.btn-login:disabled {\n  background: #444;\n  color: #888;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.footer-text {\n  margin-top: 2.5rem;\n  font-size: 0.85rem;\n  color: rgba(248, 237, 218, 0.4);\n  border-top: 1px solid rgba(248, 237, 218, 0.1);\n  padding-top: 1.5rem;\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/auth/login/login.component.ts", lineNumber: 14 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", loadComponent: () => import("./chunk-EN24UEMJ.js").then((m) => m.HomeComponent) },
  { path: "menu", loadComponent: () => import("./chunk-MCJC7WEK.js").then((m) => m.MenuComponent) },
  { path: "mis-pedidos", loadComponent: () => import("./chunk-UQUGWW3C.js").then((m) => m.MisPedidosComponent) },
  { path: "**", redirectTo: "login" }
];

// src/app/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const userData = localStorage.getItem("user_data");
  let phone = "";
  if (userData) {
    try {
      const user = JSON.parse(userData);
      phone = user.telefono || "";
    } catch (e) {
      console.error("Error parsing user data for auth header", e);
    }
  }
  if (phone) {
    const authReq = req.clone({
      headers: req.headers.set("X-Auth-Phone", phone)
    });
    return next(authReq);
  }
  return next(req);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet],
      template: "<router-outlet></router-outlet>"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
