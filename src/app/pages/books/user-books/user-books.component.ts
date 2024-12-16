import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service'; // Używamy AuthService
import { KsiazkaDto } from '../../../services/my-books-service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class UserBooksComponent implements OnInit {
  books$!: Observable<KsiazkaDto[]>;

  constructor(
    private authService: AuthService, // Używamy AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Sprawdzamy, czy token jest pobierany poprawnie
    const token = this.authService.getToken();
    console.log('Token from localStorage:', token);

    let userId: number | null = null;

    // Jeśli token jest, dekodujemy go i logujemy zawartość
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Dekodowanie tokenu
        console.log('Decoded Token:', decodedToken);

        // Sprawdzamy userId z tokenu
        userId = decodedToken.nameid || decodedToken.sub || null;
        console.log('Decoded userId:', userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in localStorage');
    }

    // Jeśli userId jest dostępne z tokenu, używamy go
    if (!userId) {
      // Jeśli nie ma userId w tokenie, sprawdzamy, czy jest w URL
      userId = +this.route.snapshot.paramMap.get('userId')!;
      console.log('Received userId from URL:', userId);
    }

    // Jeśli userId jest poprawne, kontynuujemy pobieranie książek
    if (userId && userId > 0) {
      this.books$ = this.authService.getBooksByUserId(userId).pipe(
        catchError((error) => {
          console.error('Error loading books for user:', error);
          return of([]); // Zwracamy pustą tablicę w przypadku błędu
        })
      );
    } else {
      console.error('Invalid userId');
      this.router.navigate(['/home']); // Możesz przekierować na stronę główną lub stronę błędu
    }
  }
}
