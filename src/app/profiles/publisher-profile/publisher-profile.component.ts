import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublisherService, Publisher } from '../../services/publisher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publisher-profile.component.html',
  styleUrls: ['./publisher-profile.component.scss'],
})
export class PublisherProfileComponent implements OnInit {
  publisher: Publisher | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private publisherService: PublisherService
  ) {}

  ngOnInit(): void {
    const publisherId = +this.route.snapshot.paramMap.get('id')!;
    if (!isNaN(publisherId)) {
      this.loadPublisher(publisherId);
    } else {
      this.errorMessage = 'Nieprawidłowe ID wydawnictwa.';
    }
  }

  loadPublisher(id: number): void {
    this.publisherService.getPublisherById(id).subscribe({
      next: (data) => {
        this.publisher = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Nie udało się pobrać szczegółów wydawnictwa.';
      },
    });
  }
}
