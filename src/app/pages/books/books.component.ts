import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service'; // Używamy AuthService
import { BookService } from '../../services/books.service'; // Używamy BookService
import { MyBooksService } from '../../services/my-books-service'; // Używamy MyBooksService
import { KsiazkaDto } from '../../services/my-books-service'; // Typ danych książki
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books$!: Observable<KsiazkaDto[]>; // Typowane książki
  isUserBooks: boolean = false; // Flaga, która określi, czy pokazujemy książki użytkownika
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService, // Obsługa tokenu
    private bookService: BookService, // Pobieranie książek
    private myBooksService: MyBooksService, // Pobieranie książek użytkownika
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subskrybujemy zmiany w userId
    this.authSubscription = this.authService.currentUser.subscribe((userId) => {
      // Jeśli mamy userId, pokazujemy książki użytkownika
      if (userId) {
        this.isUserBooks = true;
        this.loadBooksForUser(userId);
      } else {
        // Jeśli nie mamy userId, pokazujemy wszystkie książki
        this.isUserBooks = false;
        this.loadAllBooks();
      }
    });

    // Jeśli jest userId w URL, używamy go
    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    if (userIdFromRoute) {
      const userId = +userIdFromRoute;
      this.isUserBooks = true;
      this.loadBooksForUser(userId);
    } else {
      // Jeśli nie ma userId w URL, sprawdzamy token
      const token = this.authService.getToken();
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userId = decodedToken.nameid || decodedToken.sub || null;
        if (userId) {
          this.isUserBooks = true;
          this.loadBooksForUser(userId);
        } else {
          this.loadAllBooks();
        }
      } else {
        this.loadAllBooks();
      }
    }
  }

  ngOnDestroy(): void {
    // Czyszczenie subskrypcji
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Ładujemy książki użytkownika
  private loadBooksForUser(userId: number): void {
    this.books$ = this.myBooksService.getBooksByUserId(userId).pipe(
      catchError((error) => {
        console.error('Error loading books for user:', error);
        return of([]); // W przypadku błędu, zwracamy pustą tablicę
      })
    );
  }

  // Ładujemy wszystkie książki
  private loadAllBooks(): void {
    this.books$ = this.bookService.getBooks().pipe(
      catchError((error) => {
        console.error('Error loading all books:', error);
        return of([]); // W przypadku błędu, zwracamy pustą tablicę
      })
    );
  }
}
