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
  books$!: Observable<KsiazkaDto[]>;
  isUserBooks: boolean = false;

  constructor(
    private authService: AuthService,
    private myBooksService: MyBooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userId: number | null = null;

    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        userId = decodedToken.nameid || decodedToken.sub || null;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    if (!userId) {
      userId = +this.route.snapshot.paramMap.get('userId')!;
    }
    this.books$.subscribe((books) => {
      console.log(books);
    });

    if (userId && userId > 0) {
      this.books$ = this.myBooksService.getBooksByUserId(userId).pipe(
        catchError((error) => {
          console.error('Error loading books for user:', error);
          return of([]);
        })
      );
    } else {
      console.error('Invalid userId');
      this.router.navigate(['/home']);
    }
  }
  getRatingClass(rating: number): string {
    if (rating <= 3) {
      return 'low';
    } else if (rating > 3 && rating <= 7) {
      return 'medium';
    } else if (rating > 7 && rating < 10) {
      return 'high';
    } else if (rating === 10) {
      return 'excellent';
    }
    return '';
  }
}
