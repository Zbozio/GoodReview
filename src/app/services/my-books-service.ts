import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  // URL bazowy dla API
  private apiUrl = 'https://localhost:7272/api'; // Zakładając, że api ma bazowy URL 'https://localhost:7272/api'

  constructor(private http: HttpClient) {}

  // Pobieranie książek dla konkretnego użytkownika
  getBooksByUserId(userId: number): Observable<KsiazkaDto[]> {
    // Zwracamy książki danego użytkownika
    return this.http.get<KsiazkaDto[]>(
      `${this.apiUrl}/KsiazkiUzytkownika/user/${userId}`
    );
  }

  // Pobieranie wszystkich książek
  getAllBooks(): Observable<KsiazkaDto[]> {
    // Zwracamy wszystkie książki
    return this.http.get<KsiazkaDto[]>(`${this.apiUrl}/Ksiazkas`);
  }
}
