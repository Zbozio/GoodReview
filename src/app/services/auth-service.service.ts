import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode'; // Import biblioteki do dekodowania JWT
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7272/api/auth';

  // BehaviorSubject do przechowywania aktualnego userId
  private currentUserSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(this.getUserIdFromToken());
  public currentUser: Observable<number | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Zapisanie tokenu w localStorage
  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token); // Zapisujemy token w localStorage
      this.currentUserSubject.next(this.getUserIdFromToken()); // Emitujemy userId po zapisaniu tokenu
    }
  }

  // Pobranie tokenu z localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken'); // Pobieramy token z localStorage
    }
    return null; // Jeśli nie ma dostępu do localStorage (np. na serwerze), zwracamy null
  }

  // Pobranie userId z tokenu
  public getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Dekodowanie tokenu
        return (
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ] ||
          decodedToken.sub ||
          null
        );
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null; // Jeśli token jest pusty, zwróć null
  }

  // Publiczna metoda do pobrania userId
  // AuthService: metoda getUserId
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        console.log('Decoded Token:', decodedToken);

        // Sprawdzamy właściwy klucz 'nameidentifier'
        return (
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ] || null
        );
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Sprawdzenie, czy użytkownik jest zalogowany
  isLoggedIn(): boolean {
    return this.getToken() !== null; // Jeśli token istnieje, użytkownik jest zalogowany
  }

  // Usunięcie tokenu z localStorage (logout)
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken'); // Usuwamy token z localStorage
      this.currentUserSubject.next(null); // Emitujemy null po wylogowaniu
    }
  }

  // Logowanie użytkownika
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
