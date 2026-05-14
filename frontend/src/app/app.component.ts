import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, CommonModule, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private router = inject(Router);
    private location = inject(Location);
    showBackButton: boolean = false;
    showNavbar: boolean = false;

    ngOnInit() {
        // Initial check
        this.checkBackButton(this.router.url);
        
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.checkBackButton(event.urlAfterRedirects);
        });
    }

    checkBackButton(url: string) {
        const isLogin = url.includes('/login') || url === '/';
        this.showNavbar = !isLogin;
        // No mostrar botón atrás en login ni en home
        this.showBackButton = !url.includes('/home') && !isLogin;
    }

    goBack() {
        this.location.back();
    }
}
