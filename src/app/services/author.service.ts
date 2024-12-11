import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model autora (możesz dostosować do swojej aplikacji)
export interface Author {
  id: number;
  name: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://localhost:7272/api/Autors'; // Zmień na swój adres API

  constructor(private http: HttpClient) {}

  // Pobierz listę autorów
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  // Pobierz szczegóły autora po ID
  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  // Dodaj nowego autora
  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  // Zaktualizuj dane autora
  updateAuthor(id: number, author: Author): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, author);
  }

  // Usuń autora
  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
