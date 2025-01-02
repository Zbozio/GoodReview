import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../friends.service'; // Importujemy serwis FriendsService
import { AuthService } from '../../services/auth-service.service'; // Importujemy serwis AuthService
import { Observable } from 'rxjs'; // Importujemy Observable do asynchronicznego pobierania danych
import { CommonModule } from '@angular/common'; // Importujemy CommonModule
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true, // Komponent jest samodzielny
  imports: [CommonModule, MatIcon, RouterModule], // Importujemy CommonModule, aby używać pipe async
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends$!: Observable<any[]>; // Obserwujemy listę znajomych

  constructor(
    private friendsService: FriendsService, // Wstrzykujemy serwis FriendsService
    private authService: AuthService // Wstrzykujemy serwis AuthService, by uzyskać userId
  ) {}

  ngOnInit(): void {
    this.loadFriends(); // Ładujemy znajomych po załadowaniu komponentu
  }

  // Funkcja do pobierania listy znajomych
  loadFriends(): void {
    this.friends$ = this.friendsService.getUserFriends(); // Pobieramy listę znajomych z serwisu
  }
}
