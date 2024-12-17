import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatunkowoscService {
  private apiUrl = 'https://localhost:7272/api/Gatunkowosc'; // URL do backendu

  constructor(private http: HttpClient) {}

  // Pobranie książek z powiązanymi gatunkami
  getBooksWithGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books-with-genres`);
  }

  // Pobranie gatunków z powiązanymi książkami
  getGenresWithBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genres-with-books`);
  }

  // Pobranie gatunków dla danej książki
  getGenresForBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/${bookId}/genres`);
  }

  // Pobranie książek dla danego gatunku
  getBooksForGenre(genreId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres/${genreId}/books`);
  }
}
