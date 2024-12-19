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
  booksByGenres: { [key: number]: any[] } = {}; // Obiekt książek wg gatunków
  allBooks: any[] = []; // Tablica wszystkich książek
  loading: boolean = true;
  errorMessage: string = '';

  // Indeks bieżącej książki
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

  // Ładowanie ulubionych gatunków
  loadFavoriteGenres(userId: number): void {
    this.favoriteGenresService.getFavoriteGenres(userId).subscribe({
      next: (data: FavoriteGenre[]) => {
        this.favoriteGenres = data;
        this.loading = false;

        // Po załadowaniu ulubionych gatunków, pobieramy książki
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

  // Pobieranie książek dla danego gatunku
  loadBooksForGenre(genreId: number): void {
    this.gatunkowoscService.getBooksForGenre(genreId).subscribe({
      next: (data: any) => {
        if (data && data.books) {
          // Łączenie książek z różnych gatunków w jedną tablicę
          this.booksByGenres[genreId] = data.books;

          this.allBooks = [...this.allBooks, ...data.books]; // Dodajemy książki do tablicy
          console.log('Wszystkie książki:', this.allBooks);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err);
      },
    });
  }

  // Metoda do zmiany książki w sliderze
  changeImage(direction: number): void {
    if (this.allBooks.length === 0) return;

    // Obliczamy nowy indeks
    let newIndex = this.currentBookIndex + direction;

    // Jeśli nowy indeks jest poza zakresem, przechodzimy do końca lub na początek
    if (newIndex < 0) {
      newIndex = this.allBooks.length - 1;
    } else if (newIndex >= this.allBooks.length) {
      newIndex = 0;
    }

    // Ustawiamy nowy indeks
    this.currentBookIndex = newIndex;
  }

  // Obsługa błędów
  handleError(err: HttpErrorResponse): void {
    if (err.error instanceof ErrorEvent) {
      this.errorMessage = `Błąd: ${err.error.message}`;
    } else {
      this.errorMessage = `Błąd serwera: ${err.status} - ${err.message}`;
    }
  }
}
