import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class ListOfBooksService {
  private baseUrl = 'https://localhost:7272/api/DodawanieDoList';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooksByListId(listId: number): Observable<any> {
    const userId = this.authService.getUserId();

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http.get<any[]>(`${this.baseUrl}/list/${listId}/books`).pipe(
      tap((response) =>
        console.log('Odpowiedź z API (getBooksByListId):', response)
      ),
      catchError((error) => {
        console.error('Błąd podczas pobierania książek z listy:', error);
        return of({ books: [] });
      })
    );
  }

  getBooksInList(listId: number): Observable<any> {
    const userId = this.authService.getUserId();

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/user/${userId}/lists-with-books`)
      .pipe(
        tap((response) => console.log('Odpowiedź z API:', response)),
        catchError((error) => {
          console.error('Błąd podczas pobierania książek:', error);
          return of({ books: [] });
        })
      );
  }

  addBookToList(payload: { listId: number; bookId: number }): Observable<any> {
    const userId = this.authService.getUserId();

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http.post(`${this.baseUrl}/add-book-to-list`, {
      userId,
      ...payload,
    });
  }

  removeBookFromList(
    userId: number,
    listId: number,
    bookId: number
  ): Observable<any> {
    if (!userId || !listId || !bookId) {
      throw new Error('Niepoprawne dane: brak userId, listId lub bookId');
    }

    return this.http.delete(
      `${this.baseUrl}/remove-book-from-list/${userId}/${listId}/${bookId}`
    );
  }

  checkIfUserIsListOwner(listId: number): Observable<boolean> {
    const userId = this.authService.getUserId();

    if (!userId) {
      return of(false);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/user/${userId}/lists-with-books`)
      .pipe(
        map((lists: any[]) => {
          const list = lists.find((list) => list.idListy === listId);
          return list ? list.idUzytkownik === userId : false;
        }),
        catchError(() => of(false))
      );
  }
}
