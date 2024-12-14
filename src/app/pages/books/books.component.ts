import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/books.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // Importowanie Observable

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'], // Poprawka: 'styleUrl' powinno być 'styleUrls'
})
export class BooksComponent implements OnInit {
  books$!: Observable<any[]>; // Używamy Observable zamiast Array

  constructor(private booksService: BookService, private router: Router) {}

  ngOnInit(): void {
    // Pobieramy książki jako Observable
    this.books$ = this.booksService.getBooks(); // Teraz przypisujemy Observable
  }
}
