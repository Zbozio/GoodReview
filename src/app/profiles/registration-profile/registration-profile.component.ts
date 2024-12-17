import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register-service.service';
import { GatunekService } from '../../services/gatunek.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Do obsługi ngModel
import { MatCardModule } from '@angular/material/card'; // Do kart
import { MatInputModule } from '@angular/material/input'; // Do pól tekstowych
import { MatButtonModule } from '@angular/material/button'; // Do przycisków
import { MatFormFieldModule } from '@angular/material/form-field'; // Do form field
import { MatIconModule } from '@angular/material/icon'; // Do ikon
import { MatError } from '@angular/material/form-field'; // Do obsługi błędów
import { UzytkownikDTO } from '../../models/UzytkownikDTO';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, // Importowanie FormsModule
    MatCardModule, // Importowanie MatCardModule
    MatInputModule, // Importowanie MatInputModule
    MatButtonModule, // Importowanie MatButtonModule
    MatFormFieldModule, // Importowanie MatFormFieldModule
    MatIconModule, // Importowanie MatIconModule
    MatError,
    MatDatepickerModule,
    CommonModule,
    MatOption,
    MatSelectModule,
    MatNativeDateModule,
  ],
})
export class RegistrationProfileComponent implements OnInit {
  imie: string = '';
  nazwisko: string = '';
  email: string = '';
  haslo: string = '';
  confirmHaslo: string = '';
  gatunkiIds: number[] = []; // Wybór gatunków
  dataUrodzenia: string = ''; // Data urodzenia

  errorMessage: string = '';
  gatunki: any[] = []; // Lista gatunków

  constructor(
    private registerService: RegisterService,
    private gatunekService: GatunekService, // Serwis gatunków
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pobranie gatunków przy inicjalizacji komponentu
    this.gatunekService.getGatuneks().subscribe({
      next: (response) => {
        this.gatunki = response; // Przypisanie pobranych gatunków
        console.log('Pobrane gatunki:', response); // Logowanie odpowiedzi
      },
      error: (err) => {
        this.errorMessage = 'Nie udało się pobrać gatunków. Spróbuj ponownie.';
      },
    });
  }

  register() {
    // Sprawdzamy, czy hasła są zgodne
    if (this.haslo !== this.confirmHaslo) {
      this.errorMessage = 'Hasła muszą się zgadzać';
      return;
    }

    // Tworzymy obiekt DTO na podstawie danych w formularzu
    const userDto: UzytkownikDTO = {
      imie: this.imie,
      nazwisko: this.nazwisko,
      eMail: this.email,
      haslo: this.haslo,
      gatunkiIds: this.gatunkiIds,
      dataUrodzenia: this.dataUrodzenia,
    };

    // Wywołanie metody serwisu, aby wysłać dane do API
    this.registerService.register(userDto).subscribe({
      next: (response) => {
        this.errorMessage = ''; // Resetowanie komunikatu o błędzie
        this.router.navigate(['/login']); // Po rejestracji przekierowanie do logowania
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Błąd rejestracji. Spróbuj ponownie.';
      },
    });
  }
}
