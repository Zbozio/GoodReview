import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent implements OnInit {
  userId: number | null = null;
  timeline: any[] = []; // Tablica na ocenione książki i recenzje znajomych

  constructor(
    private ratingService: RatingService,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    console.log('Initializing timeline for user ID:', this.userId);

    if (this.userId) {
      this.loadTimeline();
    } else {
      console.log('User not logged in');
    }
  }

  loadTimeline() {
    console.log('Loading timeline...');

    if (this.userId !== null) {
      // Pobierz listę znajomych
      this.ratingService.getUserFriends(this.userId).subscribe(
        (friendsData) => {
          console.log('Fetched user friends:', friendsData);

          if (friendsData.length === 0) {
            console.log('No friends found for user.');
          }

          // Załaduj oceny i recenzje dla każdego znajomego
          friendsData.forEach((friend: any) => {
            console.log('Loading ratings for friend ID:', friend.friendId);
            this.loadFriendRatings(friend.friendId, friend.dataZnajomosci); // Załadowanie ocen
            console.log('Loading reviews for friend ID:', friend.friendId);
            this.loadFriendReviews(friend.friendId, friend.dataZnajomosci); // Załadowanie recenzji
          });
        },
        (error) => {
          console.error('Error fetching user friends:', error);
        }
      );
    }
  }

  // Funkcja do ładowania ocen
  loadFriendRatings(friendId: number, friendSince: string) {
    console.log(
      `Fetching ratings for friend ID: ${friendId} since ${friendSince}`
    );

    this.ratingService.getRatingsForUser(friendId).subscribe(
      (ratingsData) => {
        console.log(`Fetched ratings for friend ID ${friendId}:`, ratingsData);

        if (ratingsData.length === 0) {
          console.log(`No ratings found for friend ID ${friendId}.`);
        }

        ratingsData.forEach((rating: any) => {
          this.timeline.push({
            type: 'rating',
            IdKsiazka: rating.idKsiazka,
            friendId: friendId,
            friendSince: friendSince,
            ratingValue: rating.wartoscOceny,
            ratingDate: this.formatDate(rating.dataOceny),
            bookName: rating.tytul,
            friendImage: rating.zdjecie,
            bookCover: rating.okladka,
          });
          console.log('Rating data:', rating);

          console.log('Rating added to timeline:', rating);
        });

        // Po załadowaniu ocen, posortuj timeline
        this.sortTimeline();
      },
      (error) => {
        console.error('Error fetching ratings for friend:', error);
      }
    );
  }

  // Funkcja do ładowania recenzji
  loadFriendReviews(friendId: number, friendSince: string) {
    console.log(
      `Fetching reviews for friend ID: ${friendId} since ${friendSince}`
    );

    this.reviewService.getReviewsByUser(friendId).subscribe(
      (reviewsData) => {
        console.log(`Fetched reviews for friend ID ${friendId}:`, reviewsData);

        if (reviewsData.length === 0) {
          console.log(`No reviews found for friend ID ${friendId}.`);
        }

        reviewsData.forEach((review: any) => {
          this.timeline.push({
            type: 'review',
            IdKsiazka: review.idKsiazka,
            friendId: friendId,
            friendSince: friendSince,
            bookName: review.ksiazkaTytul,
            friendImage: review.uzytkownikZdjecie,
            bookCover: review.ksiazkaOkladka,
            reviewText: review.trescRecenzji,
            reviewDate: this.formatDate(review.dataRecenzji),
          });

          console.log('Review added to timeline:', review);
        });

        // Po załadowaniu recenzji, posortuj timeline
        this.sortTimeline();
      },
      (error) => {
        console.error('Error fetching reviews for friend:', error);
      }
    );
  }

  // Funkcja do sortowania timeline na podstawie daty
  sortTimeline() {
    // Sortuj timeline po dacie oceny lub recenzji
    this.timeline.sort((a, b) => {
      const dateA = new Date(a.ratingDate || a.reviewDate);
      const dateB = new Date(b.ratingDate || b.reviewDate);

      return dateB.getTime() - dateA.getTime(); // Sortowanie od najnowszych
    });

    // Zaktualizowanie timeline
    this.timeline = [...this.timeline];
    console.log('Sorted timeline:', this.timeline);
  }

  // Funkcja do formatowania daty na format "yyyy-MM-dd"
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  }
}
