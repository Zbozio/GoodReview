import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service'; // Import usługi AuthService

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importowanie Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Funkcja wywoływana po próbie logowania
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        // Zapisujemy token w localStorage
        this.authService.saveToken(response.token);

        // Po udanym logowaniu przekierowujemy użytkownika na stronę główną
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Błąd logowania:', err);
        this.errorMessage = 'Niepoprawny email lub hasło.';
      },
    });
  }
}
