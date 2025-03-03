import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private apiUrl = 'https://localhost:7272/api/Wydawnictwoes';

  constructor(private http: HttpClient) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }

  getPublisherById(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.apiUrl}/${id}`);
  }

  addPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.apiUrl, publisher);
  }

  updatePublisher(id: number, publisher: Publisher): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, publisher);
  }

  deletePublisher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
