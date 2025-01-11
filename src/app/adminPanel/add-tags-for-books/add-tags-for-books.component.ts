import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tags.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/books.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Jeśli używasz mat-option
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tags-for-books',
  templateUrl: './add-tags-for-books.component.html',
  styleUrls: ['./add-tags-for-books.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
})
export class AddTagsForBooksComponent implements OnInit {
  books: any[] = []; // Lista książek
  selectedBookId: number | null = null; // ID wybranej książki
  tags: any[] = []; // Lista dostępnych tagów
  selectedTagIds: number[] = []; // Lista wybranych tagów

  constructor(
    private tagService: TagService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getBooks(); // Pobierz listę książek
    this.getTags(); // Pobierz listę tagów
  }

  // Pobieranie listy książek
  getBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        console.log('Dane książek:', data);
        this.books = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania książek', error);
      }
    );
  }

  // Pobieranie listy tagów
  getTags(): void {
    this.tagService.getTags().subscribe(
      (data) => {
        console.log('Dane z backendu - dostępne tagi:', data);
        this.tags = data;
      },
      (error) => {
        console.error('Błąd podczas pobierania tagów', error);
      }
    );
  }

  // Pobieranie tagów przypisanych do wybranej książki
  getTagsForBook(): void {
    if (this.selectedBookId !== null) {
      this.tagService.getTagsForBook(this.selectedBookId).subscribe(
        (data) => {
          console.log('Dane z backendu - przypisane tagi do książki:', data);
          // Zapewniamy, że selectedTagIds to tablica
          this.selectedTagIds = Array.isArray(data)
            ? data.map((tag: any) => tag.idOceny5)
            : [];
          console.log('Zaktualizowane selectedTagIds:', this.selectedTagIds);
        },
        (error) => {
          console.error('Błąd podczas pobierania tagów dla książki', error);
        }
      );
    }
  }

  // Wywoływane po zmianie wybranej książki, aby załadować przypisane tagi
  onBookSelect(): void {
    this.getTagsForBook();
  }

  // Przypisywanie tagów do książki
  onAddTagsToBook(): void {
    if (this.selectedBookId === null) {
      alert('Proszę wybrać książkę!');
      return;
    }

    console.log('Wybrane tagi do przypisania:', this.selectedTagIds);

    if (this.selectedTagIds.length === 0) {
      alert('Proszę wybrać co najmniej jeden tag!');
      return;
    }

    // Pobierz tagi przypisane do książki
    this.tagService.getTagsForBook(this.selectedBookId).subscribe(
      (data) => {
        const currentTags = Array.isArray(data)
          ? data.map((tag: any) => tag.idOceny5)
          : [];

        console.log('Obecnie przypisane tagi:', currentTags);

        // Filtrujemy tylko nowe tagi, które nie są przypisane
        const newTags = this.selectedTagIds.filter(
          (tagId) => !currentTags.includes(tagId)
        );

        if (newTags.length > 0) {
          console.log('Nowe tagi do przypisania:', newTags);

          // Sprawdzenie, czy selectedBookId jest liczbą, zanim wyślesz zapytanie
          if (this.selectedBookId !== null) {
            // Wywołanie metody przypisania tagów, jeśli są nowe tagi
            this.tagService
              .assignTagsToBook(this.selectedBookId!, newTags)
              .subscribe(
                (response) => {
                  console.log('Tagi zostały przypisane do książki', response);
                },
                (error) => {
                  console.error(
                    'Błąd podczas przypisywania tagów do książki',
                    error
                  );
                }
              );
          }
        } else {
          console.log('Brak nowych tagów do przypisania.');
        }
      },
      (error) => {
        console.error('Błąd podczas pobierania tagów dla książki', error);
      }
    );
  }
}
