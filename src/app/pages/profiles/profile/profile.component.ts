import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs'; // Importujemy Observable

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule], // Zaimportuj RouterModule tutaj
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  users$!: Observable<any[]>; // Zmieniamy na Observable

  constructor(
    private userService: UserService // Wstrzyknięcie serwisu UserService
  ) {}

  ngOnInit(): void {
    // Pobieramy listę użytkowników przy inicjalizacji komponentu
    this.users$ = this.userService.getUsers();
  }
}
