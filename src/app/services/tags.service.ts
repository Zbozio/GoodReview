import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = 'https://localhost:7272/api/Tagis'; // URL do API backendu dla tagów

  constructor(private http: HttpClient) {}

  // Pobieranie listy tagów
  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Pobieranie konkretnego tagu
  getTag(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Dodawanie nowego tagu
  addTag(tag: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tag);
  }

  // Aktualizacja tagu
  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tag);
  }

  // Usuwanie tagu
  deleteTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Przypisywanie tagów do książki
  assignTagsToBook(bookId: number, tagIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/assign-tags`;
    return this.http.post<any>(url, tagIds); // Przesyłamy tylko tablicę tagIds
  }

  // Pobieranie tagów przypisanych do książki
  getTagsForBook(bookId: number): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/Tags`;
    return this.http.get<any>(url);
  }
}
