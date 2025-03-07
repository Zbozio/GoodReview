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
import { RouterModule } from '@angular/router';
import { Review, ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
})
export class BookDetailsComponent implements OnInit {
  bookId: number | undefined;
  bookDetails: BookDetails | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  userRating: number = 0;
  stars: number[] = Array(10).fill(0);
  reviews: Review[] = [];
  isReviewsLoading: boolean = true;
  newReviewText: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private ratingService: RatingService,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = +params['id'];
      this.loadBookDetails();
      this.loadUserRating();
      this.loadReviews();
    });
  }

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
  loadReviews(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken();
      console.log('User ID:', userId);

      this.reviewService.getReviewsByBook(this.bookId).subscribe({
        next: (reviews) => {
          this.reviews = reviews.map((review) => {
            console.log('Review:', review);
            console.log(
              'Comparing User ID with Review User ID:',
              review.idUzytkownik === userId
            );

            return {
              ...review,
              isUserReview: !!userId && review.idUzytkownik === Number(userId),
            };
          });

          this.reviews.sort((a, b) => {
            if (a.isUserReview) {
              return -1;
            }
            if (b.isUserReview) {
              return 1;
            }
            return 0;
          });

          this.isReviewsLoading = false;
          console.log('Reviews:', this.reviews);
        },
        error: () => {
          this.isReviewsLoading = false;
        },
      });
    }
  }

  submitReview(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken();
      if (userId && this.newReviewText.trim()) {
        const newReview: Review = {
          idKsiazka: this.bookId,
          idUzytkownik: userId,
          trescRecenzji: this.newReviewText.trim(),
          dataRecenzji: new Date().toISOString(),
          polubieniaRecenzji: 0,
        };

        this.reviewService.addReview(newReview).subscribe({
          next: (review) => {
            this.reviews.push(review);
            this.newReviewText = '';
            alert('Review added successfully.');
            this.loadReviews();
          },
          error: (err) => {
            console.error('Error adding review:', err);
            alert('Failed to add review.');
          },
        });
      } else {
        alert('Please log in to submit a review or enter a valid review.');
      }
    }
  }

  loadUserRating(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken();
      if (userId) {
        this.ratingService.getRatingForBook(this.bookId, userId).subscribe({
          next: (rating) => {
            console.log('Received rating:', rating);
            if (rating && rating.wartoscOceny !== undefined) {
              this.userRating = rating.wartoscOceny;
              console.log('User rating set to:', this.userRating);
              this.updateStars();
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

  updateStars(): void {
    this.stars = Array(10).fill(0);
    for (let i = 0; i < this.userRating; i++) {
      this.stars[i] = 1;
    }
  }

  setRating(rating: number): void {
    this.userRating = rating;
    this.updateStars();
  }

  submitRating(): void {
    if (this.bookId !== undefined) {
      const userId = this.authService.getUserIdFromToken();
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
