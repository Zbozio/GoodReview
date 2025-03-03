import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { BookService } from '../../services/books.service';
import { MyBooksService } from '../../services/my-books-service';
import { KsiazkaDto } from '../../services/my-books-service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books$!: Observable<KsiazkaDto[]>;
  isUserBooks: boolean = false;
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private myBooksService: MyBooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe((userId) => {
      if (userId) {
        this.isUserBooks = true;
        this.loadBooksForUser(userId);
      } else {
        this.isUserBooks = false;
        this.loadAllBooks();
      }
    });

    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    if (userIdFromRoute) {
      const userId = +userIdFromRoute;
      this.isUserBooks = true;
      this.loadBooksForUser(userId);
    } else {
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
  getRatingClass(rating: number): string {
    if (rating <= 3) {
      return 'low';
    } else if (rating > 3 && rating <= 6) {
      return 'medium';
    } else if (rating >= 7 && rating < 10) {
      return 'high';
    } else if (rating === 10) {
      return 'excellent';
    }
    return '';
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private loadBooksForUser(userId: number): void {
    this.books$ = this.myBooksService.getBooksByUserId(userId).pipe(
      catchError((error) => {
        console.error('Error loading books for user:', error);
        return of([]);
      })
    );
  }

  private loadAllBooks(): void {
    this.books$ = this.bookService.getBooks().pipe(
      catchError((error) => {
        console.error('Error loading all books:', error);
        return of([]);
      })
    );
  }
}
