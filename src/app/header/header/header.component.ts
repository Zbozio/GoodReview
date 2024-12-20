import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BookService } from '../../services/books.service';
import { startWith, map, debounceTime, switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { KsiazkaDto } from '../../services/my-books-service';

interface Book {
  idKsiazka: number;
  tytul: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  searchControl = new FormControl();
  filteredBooks!: Observable<Book[]>;
  allBooks: Book[] = [];
  users$!: Observable<any[]>;
  userId!: number | null; // Ustawiamy zmienną dla userId
  private authSubscription!: Subscription;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private bookService: BookService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subskrybujemy zmiany w userId
    this.authSubscription = this.authService.currentUser.subscribe((userId) => {
      this.userId = userId;
      if (this.userId) {
        console.log('Logged in User ID:', this.userId);
      } else {
        console.error('No userId found, please login!');
      }
    });

    // Pobierz wszystkie książki
    this.bookService.getBooks().subscribe((books) => {
      this.allBooks = books;

      this.filteredBooks = this.searchControl.valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        switchMap((value) => this.filterBooks(value))
      );
    });
  }

  ngOnDestroy(): void {
    // Czyszczenie subskrypcji
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.resetSearch(); // Resetowanie formularza przy zniszczeniu komponentu
  }

  private resetSearch() {
    this.searchControl.setValue('');
    this.searchControl.updateValueAndValidity();
    if (this.searchInput) {
      this.searchInput.nativeElement.blur();
    }
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

  displayBookTitle(book: Book): string {
    return book && book.tytul ? book.tytul : '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.resetSearch();
  }

  // Metoda po wybraniu książki
  onOptionSelected(event: any): void {
    const selectedBook = event.option.value;

    setTimeout(() => {
      this.router.navigate([`/bookDetails/${selectedBook.idKsiazka}`]);
    }, 0);

    this.resetSearch();
  }
}
