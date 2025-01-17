import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfejs reprezentujący strukturę komentarza
export interface Comment {
  idOceny3: number;
  trescKomentarza: string;
  idRecenzji: number;
  idUzytkownik: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'https://localhost:7272/api/Komentarzs'; // Twój endpoint API

  constructor(private http: HttpClient) {}

  // Pobierz wszystkie komentarze
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  // Pobierz pojedynczy komentarz
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  // Dodaj nowy komentarz
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  // Edytuj istniejący komentarz
  updateComment(id: number, comment: Comment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comment);
  }
  getCommentsForReview(reviewId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/review/${reviewId}`);
  }

  // Usuń komentarz
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
