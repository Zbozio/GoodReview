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
  private baseUrl = 'https://localhost:7272/api/Listums';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getListsForUser(): Observable<List[]> {
    const userId = this.authService.getUserId();
    if (!userId) {
      throw new Error('User ID not found. User might not be logged in.');
    }
    return this.http.get<List[]>(`${this.baseUrl}/user/${userId}`);
  }
  getListsForFriend(friendId: number): Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}/user/${friendId}`);
  }

  getUserLists(): Observable<List[]> {
    return this.getListsForUser();
  }

  getListById(id: number): Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/${id}`);
  }

  createList(nazwaListy: string): Observable<List> {
    const userId = this.authService.getUserId();
    if (!userId) {
      throw new Error('User ID not found. User might not be logged in.');
    }
    const newList = { nazwaListy, idUzytkownik: userId };
    return this.http.post<List>(`${this.baseUrl}`, newList);
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
