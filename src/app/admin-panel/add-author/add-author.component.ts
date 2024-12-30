import { Component } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Author {
  idAutora: number;
  imieAutora?: string;
  nazwiskoAutora?: string;
  pseudonim?: string;
  wiek?: number | null;
  dataUrodzenia?: Date | null;
  dataSmierci?: Date | null;
  opis?: string;
}

@Component({
  selector: 'app-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class AuthorComponent {
  newAuthor: Author = {
    idAutora: 0,
    imieAutora: '',
    nazwiskoAutora: '',
    pseudonim: '',
    wiek: null,
    dataUrodzenia: null,
    dataSmierci: null,
    opis: '',
  };

  constructor(private authorService: AuthorService) {}

  onAddAuthor() {
    this.authorService.addAuthor(this.newAuthor).subscribe({
      next: (author) => {
        alert(`Dodano autora: ${author.imieAutora} ${author.nazwiskoAutora}`);
        this.newAuthor = {
          idAutora: 0,
          imieAutora: '',
          nazwiskoAutora: '',
          pseudonim: '',
          wiek: null,
          dataUrodzenia: null,
          dataSmierci: null,
          opis: '',
        };
      },
      error: (err) => {
        console.error('Błąd podczas dodawania autora:', err);
      },
    });
  }
}
