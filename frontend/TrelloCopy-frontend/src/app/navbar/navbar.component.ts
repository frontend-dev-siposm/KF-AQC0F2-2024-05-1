import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public currentUserEmail$ = this.authService.currentUserEmail$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
