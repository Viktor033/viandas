import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige la raíz a /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

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

  // Ruta comodín (404)
  { path: '**', redirectTo: 'login' }
];

