import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: '**', redirectTo: 'login' }
];
