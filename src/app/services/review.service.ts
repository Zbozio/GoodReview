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
  uzytkownikZdjecie?: string; // URL zdjęcia użytkownika
  uzytkownikImie?: string; // Połączone imię i nazwisko użytkownika
  uzytkownikNazwisko?: string;
  isUserReview?: boolean; // Flaga oznaczająca recenzję użytkownika
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7272/api/Recenzjas'; // Bazowy URL API

  constructor(private http: HttpClient) {}

  // Pobranie wszystkich recenzji
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  // Pobranie jednej recenzji na podstawie ID
  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  // Dodanie nowej recenzji
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Aktualizacja recenzji na podstawie ID
  updateReview(id: number, review: Review): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Pobranie wszystkich recenzji użytkownika
  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Uzytkownik/${userId}`);
  }

  // Pobranie wszystkich recenzji książki
  getReviewsByBook(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/Ksiazka/${bookId}`);
  }

  // Usunięcie recenzji na podstawie ID
  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
