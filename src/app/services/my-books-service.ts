import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth-service.service';

// Interfejs do danych książki
export interface KsiazkaDto {
  idKsiazka: number;
  tytul: string;
  okladka?: string;
  ocenaWartosc: number;
}

@Injectable({
  providedIn: 'root',
})
export class MyBooksService {
  private apiUrl = 'https://localhost:7272/api';

  constructor(
    private authService: AuthService, // Iniekcja AuthService do pobierania tokenu
    private http: HttpClient
  ) {}

  // Pobieranie książek dla konkretnego użytkownika
  getBooksByUserId(userId: number): Observable<KsiazkaDto[]> {
    console.log('Sending request to get books for user', userId);
    if (!userId) {
      return throwError('User ID is required'); // Jeśli brak userId, zwróć błąd
    }

    // Zwracamy książki danego użytkownika, dodając token w nagłówkach
    return this.http
      .get<KsiazkaDto[]>(`${this.apiUrl}/KsiazkiUzytkownika/user/${userId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching books:', error);
          return throwError('Failed to fetch books for the user');
        })
      );
  }

  // Pobranie tokenu z AuthService
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Sending token:', token); // Logujemy token przed wysłaniem

    if (!token) {
      throw new Error('Authorization token is missing');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Dodanie tokenu do nagłówka
  }
}
