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

import { RouterLink } from '@angular/router';

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

    RouterLink,
  ],
})
export class ListOfBooksComponent implements OnInit {
  searchControl = new FormControl();
  filteredBooks!: Observable<Book[]>;
  allBooks: Book[] = [];
  listId!: number;
  userId!: number;
  booksInList: Book[] = [];
  isOwner: boolean = false;
  listName: string = '';
  canEditList: boolean = false;

  constructor(
    private bookService: BookService,
    private listOfBookService: ListOfBooksService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.listId = Number(this.route.snapshot.paramMap.get('id'));

    const userId = this.authService.getUserId();
    if (userId === null) {
      return;
    }
    this.userId = userId;

    this.listService.getListById(this.listId).subscribe(
      (list) => {
        this.listName = list.nazwaListy;
        this.isOwner = list.idUzytkownik === Number(this.userId);
        this.canEditList = this.isOwner;
        this.loadBooksInList();
      },
      (error) => {
        console.error('Błąd podczas pobierania szczegółów listy:', error);
      }
    );

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
        this.booksInList = response.books || [];
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
