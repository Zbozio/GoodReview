import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode'; // Import biblioteki do dekodowania JWT
import { Observable, throwError } from 'rxjs';
import { KsiazkaDto } from './my-books-service';

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

  getBooksByUserId(userId: number): Observable<KsiazkaDto[]> {
    console.log('Sending request to get books for user', userId);
    if (!userId) {
      return throwError('User ID is required'); // Jeśli brak userId, zwróć błąd
    }

    // Pobieranie tokenu z localStorage
    const token = this.getToken();

    if (!token) {
      return throwError('User is not logged in'); // Jeśli brak tokenu, zwróć błąd
    }

    // Tworzenie nagłówków z tokenem
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<KsiazkaDto[]>(
      `https://localhost:7272/api/KsiazkiUzytkownika/user/${userId}`,
      {
        headers,
      }
    );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken'); // Pobieramy token z localStorage
    }
    return null; // Jeśli nie ma dostępu do localStorage (np. na serwerze), zwracamy null
  }

  // Zwracanie userId z tokenu
  // AuthService - zaktualizowana metoda getUserId
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Dekodowanie tokenu
        console.log('Decoded Token:', decodedToken);

        // Pobieramy userId z poprawnego klucza
        const userId =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ] || null;
        console.log('Decoded userId:', userId);
        return userId; // Zwracamy userId
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null; // Jeśli token jest pusty, zwróć null
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
}
