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
  users$!: Observable<any[]>; // Zmieniamy na Observable
  users: any[] = []; // Zmienna na przechowanie użytkowników

  constructor(
    private userService: UserService, // Wstrzykujemy serwis UserService
    private friendsService: FriendsService // Wstrzykujemy serwis FriendsService
  ) {}

  ngOnInit(): void {
    // Pobieramy listę użytkowników przy inicjalizacji komponentu
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Funkcja do wysyłania zaproszenia do znajomych
  sendFriendRequest(userId: number): void {
    this.friendsService.sendFriendRequest(userId).subscribe(
      (response) => {
        console.log('Zaproszenie wysłane!', response);
        // Usuwamy zaproszoną osobę z listy
        this.users = this.users.filter((user) => user.idUzytkownik !== userId);
      },
      (error) => {
        console.error('Błąd podczas wysyłania zaproszenia', error);
        // Możesz tu dodać jakąś informację o błędzie
      }
    );
  }
}
