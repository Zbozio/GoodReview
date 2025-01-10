import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

export interface List {
  idListy: number;
  nazwaListy: string;
  idUzytkownik: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private baseUrl = 'https://localhost:7272/api/Listums'; // Bazowy URL API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Pobierz wszystkie listy użytkownika
  getListsForUser(): Observable<List[]> {
    const userId = this.authService.getUserId(); // Pobieramy userId z tokena
    if (!userId) {
      throw new Error('User ID not found. User might not be logged in.');
    }
    return this.http.get<List[]>(`${this.baseUrl}/user/${userId}`);
  }
  // Pobierz listy książek znajomego
  getListsForFriend(friendId: number): Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}/user/${friendId}`);
  }
  getListDetails(listId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${listId}`);
  }

  // Pobierz listy użytkownika (alias dla getListsForUser)
  getUserLists(): Observable<List[]> {
    return this.getListsForUser();
  }

  // Pobierz konkretną listę
  getListById(id: number): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/${id}`);
  }

  // Utwórz nową listę
  createList(nazwaListy: string): Observable<List> {
    const userId = this.authService.getUserId(); // Pobieramy userId z tokena
    if (!userId) {
      throw new Error('User ID not found. User might not be logged in.');
    }
    const newList = { nazwaListy, idUzytkownik: userId };
    return this.http.post<List>(`${this.baseUrl}`, newList);
  }

  // Usuń listę
  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
