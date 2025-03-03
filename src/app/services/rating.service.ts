import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiUrl = 'https://localhost:7272/api/Ocenianie';
  private recommendationsUrl = 'https://localhost:7272/api/Ocenas';
  constructor(private http: HttpClient) {}

  rateBook(
    bookId: number,
    ratingValue: number,
    userId: number
  ): Observable<any> {
    const ratingRequest = {
      idOceny: 0,
      idKsiazka: bookId,
      idUzytkownik: userId,
      dataOceny: new Date().toISOString(),
      wartoscOceny: ratingValue,
    };

    return this.http.post(this.apiUrl, ratingRequest, { responseType: 'text' });
  }

  getRatingForBook(bookId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/${userId}`;
    return this.http.get(url);
  }

  getRatingsForUser(userId: number): Observable<any> {
    const url = `https://localhost:7272/api/Ocenas/UserRatings/${userId}`;
    return this.http.get(url);
  }

  getUserFriends(userId: number): Observable<any> {
    const url = `https://localhost:7272/api/Znajomis/UserFriends/${userId}`;
    return this.http.get(url);
  }

  getUserRecommendations(userId: number): Observable<any> {
    const url = `${this.recommendationsUrl}/UserRecommendations/${userId}`;
    return this.http.get(url);
  }

  getUserRecommendationsMatrix(userId: number): Observable<any> {
    const url = `${this.recommendationsUrl}/UserRecommendationsMatrix/${userId}`;
    return this.http.get(url);
  }
}
