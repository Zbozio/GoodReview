import { Component } from '@angular/core';
import { GatunekService } from '../../services/gatunek.service';
import { UserService } from '../../services/users.service'; // Importowanie UserService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gatunek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gatunek.component.html',
  styleUrls: ['./gatunek.component.scss'],
})
export class GatunekComponent {
  gatunki: any[] = []; // Przechowywanie danych o gatunkach
  users: any[] = []; // Przechowywanie danych o użytkownikach

  constructor(
    private gatunekService: GatunekService, // Wstrzyknięcie serwisu Gatunek
    private userService: UserService // Wstrzyknięcie serwisu User
  ) {}

  ngOnInit(): void {
    // Pobieranie danych o gatunkach
    this.gatunekService.getGatuneks().subscribe((data) => {
      this.gatunki = data;
    });

    // Pobieranie danych o użytkownikach
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
