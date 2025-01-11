import { Component } from '@angular/core';
import { TagService } from '../../services/tags.service'; // Zakładając, że serwis nazywa się TagService
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tags',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent {
  // Obiekt do przechowywania nowego tagu
  newTag = {
    IdOceny5: 0, // Domyślne id = 0
    NazwaTagu: '',
  };

  constructor(private tagService: TagService, private router: Router) {}

  // Funkcja wywoływana przy wysyłaniu formularza
  onAddTag() {
    if (this.newTag.NazwaTagu.trim()) {
      // Wywołanie metody serwisu do dodania tagu
      this.tagService.addTag(this.newTag).subscribe(
        (response) => {
          console.log('Tag dodany:', response);
          alert('Tag został dodany!');
          this.router.navigate(['/tags']); // Przekierowanie np. na listę tagów
        },
        (error) => {
          console.error('Błąd dodawania tagu:', error);
          alert('Wystąpił błąd podczas dodawania tagu!');
        }
      );
    } else {
      alert('Proszę podać nazwę tagu!');
    }
  }
}
