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
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../../services/books.service';
import { startWith, map, debounceTime, switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { UserService } from '../../services/users.service';
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
  @ViewChild('searchInput') searchInput!: ElementRef; // Uzyskujemy dostęp do inputa

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {
    // Nasłuchujemy na zmiany routingu
    this.router.events.subscribe(() => {
      this.resetSearch(); // Resetujemy searchControl przy każdej zmianie strony
    });
  }

  ngOnInit(): void {
    this.resetSearch(); // Resetowanie przy inicjalizacji

    // Pobieramy wszystkie książki
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
    this.resetSearch(); // Resetowanie formularza przy zniszczeniu komponentu
  }

  private resetSearch() {
    this.searchControl.setValue(''); // Resetujemy wartość w searchControl
    this.searchControl.updateValueAndValidity(); // Uaktualniamy validację (może być ważne, aby np. w formularzach nie powodowało to błędów)

    // Usuwamy fokus z pola wyszukiwania
    if (this.searchInput) {
      this.searchInput.nativeElement.blur(); // Usuwamy fokus z inputa
    }
  }

  private filterBooks(query: string): Observable<Book[]> {
    if (!query) {
      return new Observable<Book[]>((observer) => {
        observer.next(this.allBooks); // Jeśli brak zapytania, zwracamy wszystkie książki
        observer.complete();
      });
    }

    return new Observable<Book[]>((observer) => {
      observer.next(
        this.allBooks.filter(
          (book) => book.tytul.toLowerCase().includes(query.toLowerCase()) // Filtrujemy książki
        )
      );
      observer.complete();
    });
  }

  displayBookTitle(book: Book): string {
    return book && book.tytul ? book.tytul : '';
  }
  logout(): void {
    this.authService.logout(); // Wywołaj metodę logout w AuthService
    this.router.navigate(['/login']); // Po wylogowaniu przekieruj na stronę logowania
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.resetSearch(); // Resetowanie po kliknięciu w menu
  }

  // Metoda po wybraniu książki
  onOptionSelected(event: any): void {
    const selectedBook = event.option.value; // Otrzymujemy wybraną książkę

    // Ustawiamy timeout, aby nawigacja wykonała się przed resetowaniem formularza
    setTimeout(() => {
      this.router.navigate([`/booksDetails/${selectedBook.idKsiazka}`]); // Przechodzimy do strony książki
    }, 0); // Używamy 0ms timeoutu, aby nawigacja miała pierwszeństwo

    // Resetujemy searchControl dopiero po nawigacji
    this.resetSearch();
  }
}
