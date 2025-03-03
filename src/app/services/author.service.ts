import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Author {
  idAutora: number;
  imieAutora?: string;
  nazwiskoAutora?: string;
  pseudonim?: string;
  wiek?: number | null;
  dataUrodzenia?: Date | null;
  dataSmierci?: Date | null;
  opis?: string;
  ksiazki?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://localhost:7272/api/Autors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(id: number, author: Author): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchAuthors(query: string): Observable<Author[]> {
    const searchUrl = `${this.apiUrl}/search?query=${query}`;
    return this.http.get<Author[]>(searchUrl);
  }
}
