import { Component } from '@angular/core';
import { GatunekService } from '../../services/gatunek.service';
import { UserService } from '../../services/users.service'; // Importowanie UserService
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/books.service'; // Importowanie UserService
import { AuthorService } from '../../services/author.service';
import { PublisherService } from '../../services/publisher.service';
@Component({
  selector: 'app-gatunek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gatunek.component.html',
  styleUrls: ['./gatunek.component.scss'],
})
export class GatunekComponent {
  gatunki: any[] = []; // Przechowywanie danych o gatunkach
  users: any[] = []; // Przechowywanie danych o użytkownikach
  books: any[] = [];
  authors: any[] = [];
  publishers: any[] = [];

  constructor(
    private gatunekService: GatunekService, // Wstrzyknięcie serwisu Gatunek
    private userService: UserService, // Wstrzyknięcie serwisu User
    private bookService: BookService,
    private authorService: AuthorService,
    private publisherService: PublisherService // Wstrzyknięcie serwisu Book
  ) {}

  ngOnInit(): void {
    // Pobieranie danych o gatunkach
    this.gatunekService.getGatuneks().subscribe((data) => {
      this.gatunki = data;
    });

    // Pobieranie danych o użytkownikach
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
    this.publisherService.getPublishers().subscribe((data) => {
      this.publishers = data;
    });
  }
}
