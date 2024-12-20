import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definiowanie struktury danych książki
export interface BookDetails {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  pages: number;
  cover: string;
  isbn: string;
  publisher: {
    id: number;
    name: string;
  } | null;
  genres: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  authors: Array<{
    id: number;
    firstName: string;
    lastName: string;
    authorshipType: { id: number; name: string } | null;
  }>;
  averageRating: number;
  totalRatings: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  private apiUrl = 'https://localhost:7272/api/BookDetails'; // Adres API (zmień na odpowiedni URL)

  constructor(private http: HttpClient) {}

  // Metoda pobierająca szczegóły książki
  getBookDetails(id: number): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.apiUrl}/${id}`);
  }
}
