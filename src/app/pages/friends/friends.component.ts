import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../friends.service';
import { AuthService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends$!: Observable<any[]>;

  constructor(
    private friendsService: FriendsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFriends();
  }
  removeFriend(requestId: number): void {
    this.friendsService.removeFriend(requestId).subscribe(() => {
      this.loadFriends();
    });
  }

  loadFriends(): void {
    this.friends$ = this.friendsService.getUserFriends();
    this.friends$.subscribe((friends) => {
      console.log(
        'Friends:',
        friends.map((friend) => friend.idZnajomosci)
      );
    });
  }
}
