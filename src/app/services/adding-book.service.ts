import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfejs BookDto powinien odpowiadać strukturze C#
export interface BookDto {
  title: string;
  description: string;
  releaseYear: number | null;
  pages: number;
  cover: string;
  isbn: string;
  publisherId: number;
  genreIds: number[];
  authors: {
    authorId: number;
    firstName: string;
    lastName: string;
    authorshipTypeId: string;
    contributionValue: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class AddingBookService {
  private apiUrl = 'https://localhost:7272/api/AddingBook';

  constructor(private http: HttpClient) {}

  addBook(book: BookDto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, book, { headers });
  }
}
