import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // AUTH API METHODS
  login(data: any): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.AUTH}/login`, data).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.AUTH}/register`, data);
  }

  // TOKEN MANAGEMENT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // AUTH CHECKS
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  //   JWT ROLE HANDLING
  getUserRole(): string {
    const token = this.getToken();

    if (!token) return '';

    try {
      //   Decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));

      //   Return role from payload
      return payload.role || '';
    } catch (error) {
      console.error('Invalid token: ', error);
      return '';
    }
  }

  // CURRENT USER FROM LOCAL STORAGE
  getStoredUser(): any {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  //   Optional helper method
  // CURRENT USER FROM JWT
  getCurrentUser(): any {
    const token = this.getToken();

    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token: ', error);
      return null;
    }
  }
}
