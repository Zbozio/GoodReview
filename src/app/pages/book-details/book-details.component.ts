import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterModule, MatChipsModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<any> | null = null; // Przechowuje Observable książki

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Ustawiamy book$ na Observable, który pobierze książkę na podstawie ID w URL
    this.book$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const bookId = +params.get('id')!; // Pobierz ID książki z URL
        return this.bookService.getBook(bookId); // Zwróć Observable z danymi książki
      })
    );
  }
}
