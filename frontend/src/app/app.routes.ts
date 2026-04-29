import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'menu', loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent) },
    { path: 'mis-pedidos', loadComponent: () => import('./pages/mis-pedidos/mis-pedidos.component').then(m => m.MisPedidosComponent) },
    { path: 'perfil', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
    { path: 'admin/cadetes', loadComponent: () => import('./pages/admin-cadetes/admin-cadetes.component').then(m => m.AdminCadetesComponent) },
    { path: 'admin/clientes', loadComponent: () => import('./pages/admin-clientes/admin-clientes.component').then(m => m.AdminClientesComponent) },
    { path: 'admin/pedidos', loadComponent: () => import('./pages/admin-pedidos/admin-pedidos.component').then(m => m.AdminPedidosComponent) },
    { path: 'pago-exitoso', loadComponent: () => import('./pages/payment-result/payment-result.component').then(m => m.PaymentResultComponent), data: { status: 'success' } },
    { path: 'pago-fallido', loadComponent: () => import('./pages/payment-result/payment-result.component').then(m => m.PaymentResultComponent), data: { status: 'failure' } },
    { path: 'pago-pendiente', loadComponent: () => import('./pages/payment-result/payment-result.component').then(m => m.PaymentResultComponent), data: { status: 'pending' } },
    { path: '**', redirectTo: 'login' }
];
