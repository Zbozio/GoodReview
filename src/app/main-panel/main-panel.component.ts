import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service.service';
import { ReviewService } from '../services/review.service';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../services/comments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent implements OnInit {
  userId: number | null = null;
  timeline: any[] = []; // Tablica na ocenione książki i recenzje znajomych
  showComments: boolean[] = [];
  newCommentText: string = ''; // Tekst nowego komentarza
  // Tablica do kontrolowania widoczności komentarzy

  constructor(
    private ratingService: RatingService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    console.log('Initializing timeline for user ID:', this.userId);

    if (this.userId) {
      this.loadTimeline();
    } else {
      console.log('User not logged in');
    }
    this.showComments = this.timeline.map(() => false);
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
            this.loadFriendRatings(friend.friendId, friend.dataZnajomosci); // Załadowanie ocen
            this.loadFriendReviews(friend.friendId, friend.dataZnajomosci); // Załadowanie recenzji
          });
        },
        (error) => {
          console.error('Error fetching user friends:', error);
        }
      );
    }
  }
  addComment(reviewId: number) {
    if (this.newCommentText.trim() !== '') {
      const newComment: Comment = {
        idOceny3: 0, // Serwer ustawi idOceny3, kiedy komentarz zostanie zapisany
        trescKomentarza: this.newCommentText,
        idRecenzji: reviewId,
        idUzytkownik: this.userId!,
      };

      this.commentsService.addComment(newComment).subscribe(
        (comment) => {
          console.log('Comment added:', comment);
          this.newCommentText = ''; // Czyścimy pole tekstowe
          this.loadTimeline(); // Odświeżenie danych

          // Opcjonalne pełne odświeżenie komponentu:
          setTimeout(() => {
            window.location.reload(); // Odświeżenie strony
          }, 500); // Drobne opóźnienie, aby upewnić się, że dane zostały zaktualizowane
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  // Funkcja do ładowania ocen
  loadFriendRatings(friendId: number, friendSince: string) {
    this.ratingService.getRatingsForUser(friendId).subscribe(
      (ratingsData) => {
        if (ratingsData.length === 0) {
          console.log(`No ratings found for friend ID ${friendId}.`);
        }

        ratingsData.forEach((rating: any) => {
          this.timeline.push({
            type: 'rating',
            IdKsiazka: rating.idKsiazka,
            friendId: friendId,
            friendName: rating.imie,
            friendSurname: rating.nazwisko,
            friendSince: friendSince,
            ratingValue: rating.wartoscOceny,
            ratingDate: this.formatDate(rating.dataOceny),
            bookName: rating.tytul,
            friendImage: rating.zdjecie,
            bookCover: rating.okladka,
          });
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
    this.reviewService.getReviewsByUser(friendId).subscribe(
      (reviewsData) => {
        if (reviewsData.length === 0) {
        }
        // reviewsData.forEach((review: any) => {
        //   getCommentsForReview(review.idRecenzja).subscribe((comments) => {
        //   this.timeline.push()})

        reviewsData.forEach((review: any) => {
          this.timeline.push({
            type: 'review',
            idRecenzji: review.idRecenzji,
            IdKsiazka: review.idKsiazka,
            friendName: review.uzytkownikImie,
            friendSurname: review.uzytkownikNazwisko,
            friendId: friendId,
            friendSince: friendSince,
            bookName: review.ksiazkaTytul,
            friendImage: review.uzytkownikZdjecie,
            bookCover: review.ksiazkaOkladka,
            reviewText: review.trescRecenzji,
            reviewDate: this.formatDate(review.dataRecenzji),
            komentarze: review.komentarze,
          });
        });

        // Po załadowaniu recenzji, posortuj timeline
        this.sortTimeline();
      },
      (error) => {
        console.error('Error fetching reviews for friend:', error);
      }
    );
  }

  toggleComments(index: number) {
    // Przełącz widoczność komentarzy dla danej recenzji
    this.showComments[index] = !this.showComments[index];
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
  }

  // Funkcja do formatowania daty na format "yyyy-MM-dd"
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  }
}
