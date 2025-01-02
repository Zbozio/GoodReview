import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private apiUrl = 'https://localhost:7272/api/Znajomis'; // Backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Wysyłanie zaproszenia do znajomego
  sendFriendRequest(recipientId: number): Observable<string> {
    const senderId = this.authService.getUserId(); // Pobranie userId z tokena

    if (senderId === null) {
      throw new Error('User not logged in');
    }

    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('recipientId', recipientId.toString());

    return this.http.post<string>(`${this.apiUrl}/SendRequest`, null, {
      params,
      responseType: 'text' as 'json', // Tutaj zmieniamy na tekst
    });
  }

  respondToRequest(requestId: number, isAccepted: boolean): Observable<any> {
    const url = `${this.apiUrl}/RespondToRequest?requestId=${requestId}&isAccepted=${isAccepted}`;
    return this.http.post(url, {}, { responseType: 'text' }); // Zmieniamy responseType na text
  }

  // Pobieranie zaproszeń oczekujących na akceptację
  getPendingFriendRequests(): Observable<any[]> {
    const userId = this.authService.getUserId(); // Pobranie userId z tokena

    if (userId === null) {
      throw new Error('User not logged in');
    }

    return this.http.get<any[]>(`${this.apiUrl}/PendingRequests/${userId}`);
  }

  // Pobieranie listy znajomych użytkownika
  getUserFriends(): Observable<any[]> {
    const userId = this.authService.getUserId(); // Pobieranie userId z tokena

    if (userId === null) {
      throw new Error('User not logged in');
    }

    return this.http.get<any[]>(`${this.apiUrl}/UserFriends/${userId}`);
  }
}

// Typ dla zaproszeń
export interface FriendRequest {
  requestId: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  status: string;
  dateSent: string;
}
