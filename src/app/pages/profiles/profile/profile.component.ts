import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/users.service';
import { FriendsService } from '../../../friends.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  users$!: Observable<any[]>;
  users: any[] = [];

  constructor(
    private userService: UserService,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  sendFriendRequest(userId: number): void {
    this.friendsService.sendFriendRequest(userId).subscribe(
      (response) => {
        console.log('Zaproszenie wysłane!', response);
        this.users = this.users.filter((user) => user.idUzytkownik !== userId);
      },
      (error) => {
        console.error('Błąd podczas wysyłania zaproszenia', error);
      }
    );
  }
}
