import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { BookService } from '../../../services/books.service';
import { ListOfBooksService } from '../../../services/list-of-books.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { ListService } from '../../../services/list.service';

interface Book {
  idKsiazka: number;
  tytul: string;
}

@Component({
  selector: 'app-list-of-books-component',
  templateUrl: './list-of-books-component.component.html',
  styleUrls: ['./list-of-books-component.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ListOfBooksComponent implements OnInit {
  searchControl = new FormControl();
  filteredBooks!: Observable<Book[]>;
  allBooks: Book[] = [];
  listId!: number;
  userId!: number;
  booksInList: Book[] = [];
  isOwner: boolean = false; // Flaga, czy użytkownik jest właścicielem listy
  listName: string = ''; // Nazwa listy
  canEditList: boolean = false; // Flaga do kontrolowania edytowalności listy

  constructor(
    private bookService: BookService,
    private listOfBookService: ListOfBooksService, // Serwis dla książek w liście
    private route: ActivatedRoute,
    private authService: AuthService,
    private listService: ListService // Serwis dla list
  ) {}

  ngOnInit(): void {
    // Pobieramy ID listy z routingu
    this.listId = Number(this.route.snapshot.paramMap.get('id'));

    // Pobieramy ID użytkownika zalogowanego z tokenu
    const userId = this.authService.getUserId();
    if (userId === null) {
      return;
    }
    this.userId = userId;

    // Pobieramy szczegóły listy z serwera
    this.listService.getListById(this.listId).subscribe(
      (list) => {
        this.listName = list.nazwaListy;
        this.isOwner = list.idUzytkownik === Number(this.userId); // Sprawdzamy, czy użytkownik jest właścicielem listy
        this.canEditList = this.isOwner; // Jeżeli użytkownik jest właścicielem, może edytować listę
        this.loadBooksInList(); // Ładujemy książki w liście
      },
      (error) => {
        console.error('Błąd podczas pobierania szczegółów listy:', error);
      }
    );

    // Pobieramy wszystkie książki do wyszukiwania
    this.bookService.getBooks().subscribe(
      (books) => {
        this.allBooks = books;

        this.filteredBooks = this.searchControl.valueChanges.pipe(
          debounceTime(300),
          startWith(''),
          switchMap((value) => this.filterBooks(value))
        );
      },
      (error) => {
        console.error('Błąd podczas pobierania wszystkich książek:', error);
      }
    );
  }

  private loadBooksInList() {
    this.listOfBookService.getBooksByListId(this.listId).subscribe(
      (response) => {
        console.log('Odpowiedź z API:', response);
        this.booksInList = response.books || []; // Załaduj książki z odpowiedzi API
      },
      (error) => {
        console.error('Błąd podczas pobierania książek z listy:', error);
      }
    );
  }

  private filterBooks(query: string): Observable<Book[]> {
    if (!query) {
      return new Observable<Book[]>((observer) => {
        observer.next(this.allBooks);
        observer.complete();
      });
    }

    return new Observable<Book[]>((observer) => {
      observer.next(
        this.allBooks.filter((book) =>
          book.tytul.toLowerCase().includes(query.toLowerCase())
        )
      );
      observer.complete();
    });
  }

  addBookToList(book: Book): void {
    if (!this.canEditList) {
      console.error('Nie masz uprawnień do dodania książki');
      return;
    }

    this.listOfBookService
      .addBookToList({
        listId: this.listId,
        bookId: book.idKsiazka,
      })
      .subscribe(() => {
        this.booksInList.push(book);
        this.searchControl.reset();
      });
  }

  removeBookFromList(book: Book): void {
    if (!this.canEditList) {
      console.error('Nie masz uprawnień do usunięcia książki');
      return;
    }

    this.listOfBookService
      .removeBookFromList(this.userId, this.listId, book.idKsiazka)
      .subscribe(() => {
        this.booksInList = this.booksInList.filter(
          (b) => b.idKsiazka !== book.idKsiazka
        );
      });
  }
}
