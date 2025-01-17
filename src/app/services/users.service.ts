// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7272/api/Uzytkowniks'; // URL do API backendu

  constructor(private http: HttpClient) {}

  // Pobieranie listy użytkowników
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Pobieranie konkretnego użytkownika
  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Dodawanie nowego użytkownika
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Aktualizacja użytkownika
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Usuwanie użytkownika
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  updateUserProfile(userId: number, updateData: any): Observable<any> {
    const url = `${this.apiUrl}/updateProfile/${userId}`;
    return this.http.put(url, updateData);
  }
  // Pobieranie statystyk użytkownika
  getUserStatistics(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/statistics`);
  }
}
