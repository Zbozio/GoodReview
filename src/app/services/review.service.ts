import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  idRecenzji?: number;
  idKsiazka: number;
  idUzytkownik: number;
  trescRecenzji?: string;
  dataRecenzji?: string;
  polubieniaRecenzji?: number;
  uzytkownikZdjecie?: string;
  uzytkownikImie?: string;
  uzytkownikNazwisko?: string;
  komentarze?: Review[];
  isUserReview?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7272/api/Recenzjas';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateReview(id: number, review: Review): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Uzytkownik/${userId}`);
  }

  getReviewsByBook(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Ksiazka/${bookId}`);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
