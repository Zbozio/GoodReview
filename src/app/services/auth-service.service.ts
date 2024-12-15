// auth-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7272/api/auth';

  constructor(private http: HttpClient) {}

  // Zapisanie tokenu w localStorage
  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token); // Zapisujemy token w localStorage
    }
  }

  // Pobranie tokenu z localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken'); // Pobieramy token z localStorage
    }
    return null; // Jeśli nie ma dostępu do localStorage (np. na serwerze), zwracamy null
  }

  // Sprawdzenie, czy użytkownik jest zalogowany
  isLoggedIn(): boolean {
    return this.getToken() !== null; // Jeśli token istnieje, użytkownik jest zalogowany
  }

  // Usunięcie tokenu z localStorage (logout)
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken'); // Usuwamy token z localStorage
    }
  }

  // Logowanie użytkownika
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Opcjonalnie: Zabezpieczanie żądań z tokenem (np. do chronionych zasobów)
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Metoda do wysyłania zapytań HTTP z nagłówkami uwierzytelniającymi
  getWithAuth(url: string): Observable<any> {
    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
