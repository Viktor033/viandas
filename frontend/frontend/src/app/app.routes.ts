import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige la raíz a /login-celular (podés cambiarlo a 'login' si preferís el clásico)
  { path: '', redirectTo: 'login-celular', pathMatch: 'full' },

  // Rutas de autenticación con componentes standalone
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./auth/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'login-celular',
    loadComponent: () =>
      import('./auth/login-celular/login-celular.component').then(m => m.LoginCelularComponent)
  },

  // Ruta comodín (404)
  { path: '**', redirectTo: 'login-celular' }
];
