import { Component } from '@angular/core';
import { PublisherService, Publisher } from '../../services/publisher.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PublisherComponent {
  newPublisher: Publisher = {
    idWydawnictwa: 0,
    nazwa: '',
    adresSiedziby: '',
    stronaInternetowa: '',
  };

  constructor(private publisherService: PublisherService) {}

  onAddPublisher() {
    this.publisherService.addPublisher(this.newPublisher).subscribe({
      next: (publisher) => {
        alert(`Dodano wydawnictwo: ${publisher.nazwa}`);
        this.newPublisher = {
          idWydawnictwa: 0,
          nazwa: '',
          adresSiedziby: '',
          stronaInternetowa: '',
        };
      },
      error: (err) => {
        console.error('Błąd podczas dodawania wydawnictwa:', err);
      },
    });
  }
}
