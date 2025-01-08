import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public currentUserEmail$ = this.authService.currentUserEmail$;

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
