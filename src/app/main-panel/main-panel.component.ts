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
  timeline: any[] = [];
  showComments: boolean[] = [];
  newCommentText: string = '';

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
      this.ratingService.getUserFriends(this.userId).subscribe(
        (friendsData) => {
          console.log('Fetched user friends:', friendsData);

          if (friendsData.length === 0) {
            console.log('No friends found for user.');
          }

          friendsData.forEach((friend: any) => {
            this.loadFriendRatings(friend.friendId, friend.dataZnajomosci);
            this.loadFriendReviews(friend.friendId, friend.dataZnajomosci);
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
        idOceny3: 0,
        trescKomentarza: this.newCommentText,
        idRecenzji: reviewId,
        idUzytkownik: this.userId!,
      };

      this.commentsService.addComment(newComment).subscribe(
        (comment) => {
          console.log('Comment added:', comment);
          this.newCommentText = '';
          this.loadTimeline();

          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

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

        this.sortTimeline();
      },
      (error) => {
        console.error('Error fetching ratings for friend:', error);
      }
    );
  }

  loadFriendReviews(friendId: number, friendSince: string) {
    this.reviewService.getReviewsByUser(friendId).subscribe(
      (reviewsData) => {
        if (reviewsData.length === 0) {
        }

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

        this.sortTimeline();
      },
      (error) => {
        console.error('Error fetching reviews for friend:', error);
      }
    );
  }

  toggleComments(index: number) {
    this.showComments[index] = !this.showComments[index];
  }
  sortTimeline() {
    this.timeline.sort((a, b) => {
      const dateA = new Date(a.ratingDate || a.reviewDate);
      const dateB = new Date(b.ratingDate || b.reviewDate);

      return dateB.getTime() - dateA.getTime();
    });

    this.timeline = [...this.timeline];
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }
}
