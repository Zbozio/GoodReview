import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FavoriteGenresService } from '../../services/favorite-genres-service';
import { GatunkowoscService } from '../../services/gatunkowosc-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/books.service';

interface FavoriteGenre {
  idGatunku: number;
  nazwaGatunku: string;
}

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class RightPanelComponent implements OnInit {
  currentUser: any;
  userId: number | null = null;
  favoriteGenres: FavoriteGenre[] = [];
  booksByGenres: { [key: number]: any[] } = {};
  allBooks: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  currentBookIndex: number = 0;

  constructor(
    private authService: AuthService,
    private favoriteGenresService: FavoriteGenresService,
    private gatunkowoscService: GatunkowoscService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.loadFavoriteGenres(this.userId);
    } else {
      this.errorMessage = 'Nie udało się pobrać ID użytkownika';
      this.loading = false;
    }
  }

  loadFavoriteGenres(userId: number): void {
    this.favoriteGenresService.getFavoriteGenres(userId).subscribe({
      next: (data: FavoriteGenre[]) => {
        this.favoriteGenres = data;
        this.loading = false;

        this.favoriteGenres.forEach((genre) => {
          this.loadBooksForGenre(genre.idGatunku);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err);
        this.loading = false;
      },
    });
  }

  loadBooksForGenre(genreId: number): void {
    this.gatunkowoscService.getBooksForGenre(genreId).subscribe({
      next: (data: any) => {
        if (data && data.books) {
          this.booksByGenres[genreId] = data.books;

          this.allBooks = [...this.allBooks, ...data.books];
          console.log('Wszystkie książki:', this.allBooks);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err);
      },
    });
  }

  changeImage(direction: number): void {
    if (this.allBooks.length === 0) return;

    let newIndex = this.currentBookIndex + direction;

    if (newIndex < 0) {
      newIndex = this.allBooks.length - 1;
    } else if (newIndex >= this.allBooks.length) {
      newIndex = 0;
    }

    this.currentBookIndex = newIndex;
  }

  handleError(err: HttpErrorResponse): void {
    if (err.error instanceof ErrorEvent) {
      this.errorMessage = `Błąd: ${err.error.message}`;
    } else {
      this.errorMessage = `Błąd serwera: ${err.status} - ${err.message}`;
    }
  }
}
