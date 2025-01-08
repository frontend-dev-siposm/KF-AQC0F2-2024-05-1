import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public currentUserEmail$ = this.authService.currentUserEmail$;

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
