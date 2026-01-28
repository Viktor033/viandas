import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'menu', loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent) },
    { path: 'mis-pedidos', loadComponent: () => import('./pages/mis-pedidos/mis-pedidos.component').then(m => m.MisPedidosComponent) },
    { path: 'admin/cadetes', loadComponent: () => import('./pages/admin-cadetes/admin-cadetes.component').then(m => m.AdminCadetesComponent) },
    { path: '**', redirectTo: 'login' }
];
