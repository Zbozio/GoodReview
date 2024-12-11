import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  users: any[] = []; // Tablica przechowująca listę użytkowników

  constructor(
    private userService: UserService // Wstrzyknięcie serwisu UserService
  ) {}

  ngOnInit(): void {
    // Pobranie listy użytkowników przy inicjalizacji komponentu
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
