// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:7272/api/Ksiazkas'; // URL do API backendu

  constructor(private http: HttpClient) {}

  // Pobieranie listy użytkowników
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Pobieranie konkretnego użytkownika
  getBook(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Dodawanie nowego użytkownika
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  // Aktualizacja użytkownika
  updateBook(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Usuwanie użytkownika
  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
