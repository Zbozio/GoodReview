import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../friends.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-accept-friend-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-friend-requests.component.html',
  styleUrl: './accept-friend-requests.component.scss',
})
export class AcceptFriendRequestsComponent implements OnInit {
  friendRequests: any[] = [];

  constructor(
    private friendsService: FriendsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPendingFriendRequests();
  }

  loadPendingFriendRequests(): void {
    this.friendsService.getPendingFriendRequests().subscribe((requests) => {
      this.friendRequests = requests;
    });
  }

  acceptRequest(requestId: number): void {
    this.friendsService.respondToRequest(requestId, true).subscribe(
      (response) => {
        console.log('Zaproszenie zaakceptowane:', response);
        this.loadPendingFriendRequests();
      },
      (error) => {
        console.error('Błąd przy akceptowaniu zaproszenia', error);
        if (error.status === 200) {
          console.log('Serwer zwrócił 200 OK, ale wystąpił błąd aplikacji');
        } else {
          console.error('Inny błąd:', error);
        }
      }
    );
  }

  rejectRequest(requestId: number): void {
    this.friendsService.respondToRequest(requestId, false).subscribe(
      (response) => {
        console.log('Zaproszenie odrzucone:', response);
        this.loadPendingFriendRequests();
      },
      (error) => {
        console.error('Błąd przy odrzucaniu zaproszenia', error);
      }
    );
  }
}
