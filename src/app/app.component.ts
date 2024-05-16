import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/header/footer/footer.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce';

  constructor(
    private router: Router,

  ) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
