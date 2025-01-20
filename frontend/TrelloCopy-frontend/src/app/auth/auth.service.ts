import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'https://trellocopy-backand.azurewebsites.net/api/Auth';
  private apiUrl = 'https://localhost:7295/api/Auth';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private currentUserEmailSubject = new BehaviorSubject<string | null>(null);
  currentUserEmail$ = this.currentUserEmailSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize email from stored token if exists
    const token = this.tokenSubject.value;
    if (token) {
      const email = this.getEmailFromToken(token);
      this.currentUserEmailSubject.next(email);
    }
  }

  private getEmailFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        map(response => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
            const email = this.getEmailFromToken(response.token);
            this.currentUserEmailSubject.next(email);
          }
          return response;
        })
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(
        map(response => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
            const email = this.getEmailFromToken(response.token);
            this.currentUserEmailSubject.next(email);
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.currentUserEmailSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
