import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiUrl = 'https://localhost:7272/api/Ocenianie'; // URL API
  private recommendationsUrl = 'https://localhost:7272/api/Ocenas'; // Baza endpointów dla rekomendacji

  constructor(private http: HttpClient) {}

  // Metoda do wysyłania oceny książki
  rateBook(
    bookId: number,
    ratingValue: number,
    userId: number
  ): Observable<any> {
    const ratingRequest = {
      idOceny: 0, // Wartość placeholder, zakładamy, że backend generuje ID
      idKsiazka: bookId,
      idUzytkownik: userId,
      dataOceny: new Date().toISOString(),
      wartoscOceny: ratingValue,
    };

    return this.http.post(this.apiUrl, ratingRequest, { responseType: 'text' });
  }

  // Metoda do pobierania oceny książki dla danego użytkownika
  getRatingForBook(bookId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/${userId}`;
    return this.http.get(url);
  }

  // Metoda do pobierania wszystkich ocen książek dla użytkownika
  getRatingsForUser(userId: number): Observable<any> {
    const url = `https://localhost:7272/api/Ocenas/UserRatings/${userId}`;
    return this.http.get(url);
  }

  // Metoda do pobierania znajomych użytkownika
  getUserFriends(userId: number): Observable<any> {
    const url = `https://localhost:7272/api/Znajomis/UserFriends/${userId}`;
    return this.http.get(url);
  }

  // Metoda do pobierania rekomendacji książek dla użytkownika
  getUserRecommendations(userId: number): Observable<any> {
    const url = `${this.recommendationsUrl}/UserRecommendations/${userId}`;
    return this.http.get(url);
  }

  // Metoda do pobierania rekomendacji książek na podstawie macierzy podobieństw
  getUserRecommendationsMatrix(userId: number): Observable<any> {
    const url = `${this.recommendationsUrl}/UserRecommendationsMatrix/${userId}`;
    return this.http.get(url);
  }
}
