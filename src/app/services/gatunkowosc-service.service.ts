import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatunkowoscService {
  private apiUrl = 'https://localhost:7272/api/Gatunkowosc';

  constructor(private http: HttpClient) {}

  getBooksWithGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books-with-genres`);
  }

  getGenresWithBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genres-with-books`);
  }

  getGenresForBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/${bookId}/genres`);
  }

  getBooksForGenre(genreId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres/${genreId}/books`);
  }
}
