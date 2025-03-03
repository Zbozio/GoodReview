import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { RatingService } from '../../services/rating.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LeftPanelComponent implements OnInit {
  userId: number | null = null; 
  userStatistics: any;
  recentRatedBooks: any[] = []; 

  constructor(
    private userService: UserService,
    private ratingService: RatingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
    this.userId = this.authService.getUserId();

    if (this.userId) {
      this.getUserStatistics(this.userId);
      this.getRecentRatedBooks(this.userId);
    } else {
      console.error('Nie udało się pobrać ID użytkownika z tokenu.');
    }
  }

  getUserStatistics(userId: number): void {
    this.userService.getUserStatistics(userId).subscribe(
      (data) => {
        this.userStatistics = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania statystyk użytkownika:', error);
      }
    );
  }

  getRecentRatedBooks(userId: number): void {
    this.ratingService.getRatingsForUser(userId).subscribe(
      (ratings) => {
        // Sortowanie według daty oceny malejąco i pobranie 6 ostatnich
        this.recentRatedBooks = ratings
          .sort(
            (a: any, b: any) =>
              new Date(b.dataOceny).getTime() - new Date(a.dataOceny).getTime()
          )
          .slice(0, 6);
      },
      (error) => {
        console.error('Błąd podczas pobierania ocen użytkownika:', error);
      }
    );
  }
}
