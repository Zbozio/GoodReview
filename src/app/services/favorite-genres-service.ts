import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteGenresService {
  private apiUrl = 'https://localhost:7272/api/UlubioneGatunki'; // URL do API backendu

  constructor(private http: HttpClient) {}

  // Pobieranie ulubionych gatunków użytkownika
  getFavoriteGenres(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetFavorites/${userId}`);
  }
}
