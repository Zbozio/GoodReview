import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-author-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './author-profile.component.html',
  styleUrl: './author-profile.component.scss',
})
export class AuthorProfileComponent implements OnInit {
  author: any = null;
  books: any[] = []; // Lista książek autora

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.authorService.getAuthorById(+authorId).subscribe((data) => {
        this.author = data;
        this.books = data.ksiazki || []; // Pobranie książek autora
      });
    }
  }
}
