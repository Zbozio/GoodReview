import { Component, OnInit } from '@angular/core';
import { AddingBookService, BookDto } from '../../services/adding-book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GatunekService } from '../../services/gatunek.service';
import { AuthorService, Author } from '../../services/author.service';
import {
  TypeOfAuthorService,
  TypeOfAuthor,
} from '../../services/type-of-author.service';
import { PublisherService, Publisher } from '../../services/publisher.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-book',
  templateUrl: './adding-books.component.html',
  styleUrls: ['./adding-books.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
})
export class AddBookComponent implements OnInit {
  book: BookDto = {
    title: '',
    description: '',
    releaseYear: null,
    pages: 0,
    cover: '',
    isbn: '',
    publisherId: 0,
    genreIds: [],
    authors: [],
  };

  gatunki: any[] = [];
  authors: Author[] = [];
  typesOfAuthor: TypeOfAuthor[] = [];
  selectedAuthorId: number | null = null;
  selectedAuthorshipTypeId: number | null = null;
  publishers: Publisher[] = [];

  constructor(
    private addingBookService: AddingBookService,
    private gatunekService: GatunekService,
    private authorService: AuthorService,
    private typeOfAuthorService: TypeOfAuthorService,
    private publisherService: PublisherService
  ) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadTypesOfAuthor();
    this.loadAuthors();
    this.loadPublishers();
  }

  loadGenres() {
    this.gatunekService.getGatuneks().subscribe({
      next: (response) => {
        this.gatunki = response;
        console.log('Załadowane gatunki:', this.gatunki);
      },
      error: (err) => console.error('Nie udało się pobrać gatunków:', err),
    });
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
        console.log('Załadowani autorzy:', this.authors);
      },
      error: (err) => console.error('Nie udało się pobrać autorów:', err),
    });
  }

  loadTypesOfAuthor() {
    this.typeOfAuthorService.getTypes().subscribe({
      next: (response) => {
        this.typesOfAuthor = response;
        console.log('Załadowane typy autorstwa:', this.typesOfAuthor);
      },
      error: (err) =>
        console.error('Nie udało się pobrać typów autorstwa:', err),
    });
  }

  loadPublishers() {
    this.publisherService.getPublishers().subscribe({
      next: (response) => {
        this.publishers = response;
        console.log('Załadowane wydawnictwa:', this.publishers);
      },
      error: (err) => console.error('Nie udało się pobrać wydawnictw:', err),
    });
  }

  addAuthor() {
    if (this.selectedAuthorId && this.selectedAuthorshipTypeId) {
      const selectedAuthor = this.authors.find(
        (author) => Number(author.idAutora) === Number(this.selectedAuthorId)
      );

      const authorshipTypeId = this.selectedAuthorshipTypeId; // Przypisujemy tylko ID typu autorstwa

      if (selectedAuthor && authorshipTypeId) {
        // Dodajemy autora z id typu autorstwa
        this.book.authors.push({
          authorId: selectedAuthor.idAutora,
          firstName: selectedAuthor.imieAutora ?? '',
          lastName: selectedAuthor.nazwiskoAutora ?? '',
          authorshipTypeId: authorshipTypeId.toString(), // Zamiast 'authorshipType' dodajemy 'authorshipTypeId'
          contributionValue: 0,
        });

        this.selectedAuthorId = null;
        this.selectedAuthorshipTypeId = null;

        console.log('Aktualna lista autorów:', this.book.authors);
      } else {
        console.warn('Nie znaleziono autora lub typu autorstwa.');
      }
    } else {
      console.warn('Autor lub typ autorstwa nie został wybrany!');
    }
  }
  getAuthorshipTypeName(authorshipTypeId: number): string {
    const type = this.typesOfAuthor.find((t) => t.idTypu === authorshipTypeId);
    return type ? type.nazwaTypu : 'Unknown Type';
  }

  removeAuthor(index: number) {
    console.log('Usuwanie autora z indeksu:', index);
    this.book.authors.splice(index, 1);
    console.log(
      'Zaktualizowana lista autorów po usunięciu:',
      this.book.authors
    );
  }

  onSubmit() {
    console.log('Dane do wysłania:', this.book);

    this.addingBookService.addBook(this.book).subscribe({
      next: () => {
        alert('Książka została dodana!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Błąd podczas dodawania książki:', err);
        alert('Nie udało się dodać książki.');
      },
    });
  }

  resetForm() {
    this.book = {
      title: '',
      description: '',
      releaseYear: null,
      pages: 0,
      cover: '',
      isbn: '',
      publisherId: 0,
      genreIds: [],
      authors: [],
    };
    this.selectedAuthorId = null;
    this.selectedAuthorshipTypeId = null;
    console.log('Formularz został zresetowany.');
  }
}
