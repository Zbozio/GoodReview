import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service'; // Używamy AuthService
import { MyBooksService } from '../../../services/my-books-service'; // Importujemy MyBooksService
import { KsiazkaDto } from '../../../services/my-books-service'; // Importujemy KsiazkaDto
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  books$!: Observable<KsiazkaDto[]>; // Zmienna do przechowywania książek użytkownika
  isUserBooks: boolean = false; // Flaga dla książek użytkownika

  constructor(
    private authService: AuthService, // Używamy AuthService do obsługi tokenu
    private myBooksService: MyBooksService, // Używamy MyBooksService do pobierania książek użytkownika
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userId: number | null = null;

    // Sprawdzamy, czy mamy userId w URL lub tokenie
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Dekodowanie tokenu
        userId = decodedToken.nameid || decodedToken.sub || null;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // Jeśli userId jest w URL, używamy go
    if (!userId) {
      userId = +this.route.snapshot.paramMap.get('userId')!;
    }
    this.books$.subscribe((books) => {
      console.log(books);
    });

    // Pobieramy książki użytkownika, jeśli userId jest dostępne
    if (userId && userId > 0) {
      this.books$ = this.myBooksService.getBooksByUserId(userId).pipe(
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
  getRatingClass(rating: number): string {
    if (rating <= 3) {
      return 'low'; // Czerwony dla ocen poniżej 3
    } else if (rating > 3 && rating <= 7) {
      return 'medium'; // Pomarańczowy dla ocen w przedziale 4-7
    } else if (rating > 7 && rating < 10) {
      return 'high'; // Zielony dla ocen powyżej 7
    } else if (rating === 10) {
      return 'excellent'; // Niebieski dla ocen 10
    }
    return ''; // Domyślnie brak klasy
  }
}
