import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommendation-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.scss'],
})
export class RecommendationPageComponent implements OnInit {
  userId: number | null = null;
  recommendations: any[] = [];
  matrixRecommendations: any[] = [];
  selectedMethod: string = 'normal';
  loading = false;

  constructor(
    private ratingService: RatingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (!this.userId) {
      console.error('User ID not found in token.');
      return;
    }
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    if (!this.userId) {
      console.error('User ID not available. Cannot load recommendations.');
      return;
    }

    this.loading = true;
    if (this.selectedMethod === 'normal') {
      this.ratingService.getUserRecommendations(this.userId).subscribe(
        (data) => {
          this.recommendations = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching normal recommendations:', error);
          this.loading = false;
        }
      );
    } else if (this.selectedMethod === 'matrix') {
      this.ratingService.getUserRecommendationsMatrix(this.userId).subscribe(
        (data) => {
          this.matrixRecommendations = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching matrix recommendations:', error);
          this.loading = false;
        }
      );
    }
  }

  getCurrentRecommendations(): any[] {
    return this.selectedMethod === 'normal'
      ? this.recommendations
      : this.matrixRecommendations;
  }
}
