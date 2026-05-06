import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private router = inject(Router);
    private location = inject(Location);
    showBackButton: boolean = false;

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
        // No mostrar en login ni en home
        this.showBackButton = !url.includes('/home') && !url.includes('/login') && url !== '/';
    }

    goBack() {
        this.location.back();
    }
}
