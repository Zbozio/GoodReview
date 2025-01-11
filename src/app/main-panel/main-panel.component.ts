import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service'; // Upewnij się, że importujesz odpowiedni serwis
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'],
})
export class MainPanelComponent implements OnInit {
  userId: number = 50; // Przykładowe ID użytkownika
  timeline: any[] = []; // Tablica na ocenione książki znajomych

  constructor(private ratingService: RatingService) {}

  ngOnInit() {
    console.log('Initializing timeline for user ID:', this.userId);
    this.loadTimeline();
  }

  loadTimeline() {
    console.log('Loading timeline...');

    // Pobierz listę znajomych
    this.ratingService.getUserFriends(this.userId).subscribe(
      (friendsData) => {
        console.log('Fetched user friends:', friendsData);

        if (friendsData.length === 0) {
          console.log('No friends found for user.');
        }

        friendsData.forEach((friend: any) => {
          console.log('Loading ratings for friend ID:', friend.friendId);
          this.loadFriendRatings(friend.friendId, friend.dataZnajomosci);
        });
      },
      (error) => {
        console.error('Error fetching user friends:', error);
      }
    );
  }

  loadFriendRatings(friendId: number, friendSince: string) {
    console.log(
      `Fetching ratings for friend ID: ${friendId} since ${friendSince}`
    );

    // Pobierz oceny książek dla danego znajomego
    this.ratingService.getRatingsForUser(friendId).subscribe(
      (ratingsData) => {
        console.log(`Fetched ratings for friend ID ${friendId}:`, ratingsData);

        if (ratingsData.length === 0) {
          console.log(`No ratings found for friend ID ${friendId}.`);
        }

        // Dodaj ocenę do tablicy timeline
        ratingsData.forEach((rating: any) => {
          this.timeline.push({
            friendId: friendId,
            friendSince: friendSince,
            ratingValue: rating.wartoscOceny,
            ratingDate: this.formatDate(rating.dataOceny), // Formatujemy datę na format ISO 'yyyy-MM-dd'
            bookName: rating.tytul,
            friendImage: rating.zdjecie,
            bookCover: rating.okladka,
          });

          console.log('Rating added to timeline:', rating);
        });

        // Sortuj oś czasu po dacie oceny (od najnowszych)
        this.timeline.sort((a, b) => {
          const dateA = new Date(a.ratingDate);
          const dateB = new Date(b.ratingDate);

          return dateB.getTime() - dateA.getTime(); // Sortowanie od najnowszych
        });

        // Ponowne przypisanie tablicy, aby wymusić aktualizację w Angularze
        this.timeline = [...this.timeline];
        console.log('Sorted timeline:', this.timeline);
      },
      (error) => {
        console.error('Error fetching ratings for friend:', error);
      }
    );
  }

  // Funkcja do formatowania daty na format "yyyy-MM-dd"
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  }
}
