import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// src/app/models/publisher.model.ts
export interface Publisher {
  idWydawnictwa: number;
  nazwa?: string;
  adresSiedziby?: string;
  stronaInternetowa?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private apiUrl = 'https://localhost:7272/api/Wydawnictwoes'; // Zmień na swój adres API

  constructor(private http: HttpClient) {}

  // Pobierz listę wydawców
  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }

  // Pobierz szczegóły wydawcy po ID
  getPublisherById(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.apiUrl}/${id}`);
  }

  // Dodaj nowego wydawcę
  addPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.apiUrl, publisher);
  }

  // Zaktualizuj dane wydawcy
  updatePublisher(id: number, publisher: Publisher): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, publisher);
  }

  // Usuń wydawcę
  deletePublisher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
