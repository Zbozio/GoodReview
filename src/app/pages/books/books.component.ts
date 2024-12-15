import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyBooksService, KsiazkaDto } from '../../services/my-books-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  imports: [RouterModule, CommonModule],
})
export class BooksComponent implements OnInit {
  books: KsiazkaDto[] = [];
  userId: number | null = null;

  constructor(
    private booksService: MyBooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subskrybujemy zmiany w parametrach trasy
    this.route.params.subscribe((params) => {
      const userIdParam = params['userId']; // Odczytujemy parametr userId

      // Sprawdzamy, czy parametr userId jest dostępny i czy jest liczbą
      if (userIdParam && !isNaN(+userIdParam)) {
        this.userId = +userIdParam; // Konwertujemy na liczbę
        this.getBooksForUser(); // Pobieramy książki dla konkretnego użytkownika
      } else {
        this.userId = null; // Ustawiamy null, jeśli brak userId
        this.getAllBooks(); // Pobieramy wszystkie książki
      }
    });
  }

  // Funkcja pobierająca książki dla konkretnego użytkownika
  getBooksForUser(): void {
    if (this.userId !== null) {
      this.booksService.getBooksByUserId(this.userId).subscribe(
        (books) => {
          this.books = books; // Ustawiamy pobrane książki
        },
        (error) => {
          console.error('Błąd pobierania książek użytkownika', error);
        }
      );
    }
  }

  // Funkcja pobierająca wszystkie książki
  getAllBooks(): void {
    this.booksService.getAllBooks().subscribe(
      (books) => {
        this.books = books; // Ustawiamy pobrane książki
      },
      (error) => {
        console.error('Błąd pobierania książek', error);
      }
    );
  }
}
