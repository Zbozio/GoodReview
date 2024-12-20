import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BookDetailsService,
  BookDetails,
} from '../../services/book-details.service';
import { RatingService } from '../../services/rating.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Import MatIcon
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatChipsModule, FormsModule, MatIconModule],
})
export class BookDetailsComponent implements OnInit {
  bookId: number | undefined;
  bookDetails: BookDetails | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  userRating: number = 0; // Ocena użytkownika
  stars: number[] = Array(10).fill(0); // Tablica do reprezentowania 10 gwiazdek

  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private ratingService: RatingService,
    private authService: AuthService // Wstrzykujemy AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = +params['id']; // Parsowanie ID książki z URL
      this.loadBookDetails();
      this.loadUserRating(); // Ładowanie oceny użytkownika
    });
  }

  // Ładowanie szczegółów książki
  loadBookDetails(): void {
    if (this.bookId !== undefined) {
      this.bookDetailsService.getBookDetails(this.bookId).subscribe({
        next: (data) => {
          this.bookDetails = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Book not found.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Invalid book ID.';
      this.isLoading = false;
    }
  }

  // Ładowanie oceny użytkownika dla danej książki
  loadUserRating(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken(); // Pobieramy ID użytkownika z tokenu
      if (userId) {
        this.ratingService.getRatingForBook(this.bookId, userId).subscribe({
          next: (rating) => {
            console.log('Received rating:', rating); // Sprawdzanie otrzymanych danych
            if (rating && rating.wartoscOceny !== undefined) {
              this.userRating = rating.wartoscOceny; // Przypisanie oceny użytkownika
              console.log('User rating set to:', this.userRating); // Sprawdzenie wartości
              this.updateStars(); // Aktualizacja gwiazdek
            }
          },
          error: (err) => {
            console.error('Error fetching user rating', err);
          },
        });
      } else {
        console.log('User not logged in or invalid token.');
      }
    }
  }

  // Uaktualnianie gwiazdek na podstawie oceny użytkownika
  updateStars(): void {
    this.stars = Array(10).fill(0); // Resetujemy gwiazdki
    for (let i = 0; i < this.userRating; i++) {
      this.stars[i] = 1; // Wypełniamy odpowiednią liczbę gwiazdek
    }
  }

  // Ustawianie oceny przez użytkownika
  setRating(rating: number): void {
    this.userRating = rating;
    this.updateStars(); // Uaktualnienie gwiazdek na podstawie nowej oceny
  }

  // Przesyłanie oceny do backendu
  submitRating(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken(); // Pobieramy ID użytkownika z tokenu
      if (userId) {
        this.ratingService
          .rateBook(this.bookId, this.userRating, userId)
          .subscribe({
            next: () => {
              alert('Your rating has been submitted successfully.');
            },
            error: (err) => {
              alert('Failed to submit rating.');
              console.error('Error submitting rating:', err);
            },
          });
      } else {
        alert('User not logged in.');
      }
    }
  }

  goBack(): void {
    window.history.back();
  }
}
