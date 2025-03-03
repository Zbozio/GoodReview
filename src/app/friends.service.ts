import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private apiUrl = 'https://localhost:7272/api/Znajomis';

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendFriendRequest(recipientId: number): Observable<string> {
    const senderId = this.authService.getUserId();

    if (senderId === null) {
      throw new Error('User not logged in');
    }

    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('recipientId', recipientId.toString());

    return this.http.post<string>(`${this.apiUrl}/SendRequest`, null, {
      params,
      responseType: 'text' as 'json',
    });
  }
  removeFriend(requestId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/RemoveFriend/${requestId}`);
  }
  respondToRequest(requestId: number, isAccepted: boolean): Observable<any> {
    const url = `${this.apiUrl}/RespondToRequest?requestId=${requestId}&isAccepted=${isAccepted}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  getPendingFriendRequests(): Observable<any[]> {
    const userId = this.authService.getUserId();

    if (userId === null) {
      throw new Error('User not logged in');
    }

    return this.http.get<any[]>(`${this.apiUrl}/PendingRequests/${userId}`);
  }

  getUserFriends(): Observable<any[]> {
    const userId = this.authService.getUserId();

    if (userId === null) {
      throw new Error('User not logged in');
    }

    return this.http.get<any[]>(`${this.apiUrl}/UserFriends/${userId}`);
  }
}

export interface FriendRequest {
  requestId: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  status: string;
  dateSent: string;
}
