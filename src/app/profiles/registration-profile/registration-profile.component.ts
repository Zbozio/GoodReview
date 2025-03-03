import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register-service.service';
import { GatunekService } from '../../services/gatunek.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
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
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
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
  gatunkiIds: number[] = [];
  dataUrodzenia: string = '';

  errorMessage: string = '';
  gatunki: any[] = [];

  constructor(
    private registerService: RegisterService,
    private gatunekService: GatunekService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gatunekService.getGatuneks().subscribe({
      next: (response) => {
        this.gatunki = response;
        console.log('Pobrane gatunki:', response);
      },
      error: (err) => {
        this.errorMessage = 'Nie udało się pobrać gatunków. Spróbuj ponownie.';
      },
    });
  }

  register() {
    if (this.haslo !== this.confirmHaslo) {
      this.errorMessage = 'Hasła muszą się zgadzać';
      return;
    }

    const userDto: UzytkownikDTO = {
      imie: this.imie,
      nazwisko: this.nazwisko,
      eMail: this.email,
      haslo: this.haslo,
      gatunkiIds: this.gatunkiIds,
      dataUrodzenia: this.dataUrodzenia,
    };

    this.registerService.register(userDto).subscribe({
      next: (response) => {
        console.log('Zarejestrowano:', response);
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Błąd rejestracji. Spróbuj ponownie.';
      },
    });
  }
}
