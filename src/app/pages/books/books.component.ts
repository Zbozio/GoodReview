import { Component } from '@angular/core';
import { BookService } from '../../services/books.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books: any[] = [];

  constructor(private booksService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books) => (this.books = books)); // Pobieramy użytkowników przy inicjalizacji komponentu
  }

  viewProfile(bookId: number) {
    this.router.navigate(['/user-profile', bookId]); // Poprawne przekierowanie na user-profile/:id
  }
}
