import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class ListOfBooksService {
  private baseUrl = 'https://localhost:7272/api/DodawanieDoList'; // Bazowy URL API

  constructor(
    private http: HttpClient,
    private authService: AuthService // Wstrzykujemy AuthService
  ) {}

  /**
   * Pobierz książki w konkretnej liście użytkownika
   * @param listId ID listy
   * @returns Observable zawierający książki w liście
   */
  getBooksByListId(listId: number): Observable<any> {
    const userId = this.authService.getUserId(); // Pobieramy userId z tokenu

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/list/${listId}/books`) // Endpoint API do pobierania książek w konkretnej liście
      .pipe(
        tap((response) =>
          console.log('Odpowiedź z API (getBooksByListId):', response)
        ), // Logowanie odpowiedzi
        catchError((error) => {
          console.error('Błąd podczas pobierania książek z listy:', error); // Obsługa błędów
          return of({ books: [] }); // Zwracamy pustą tablicę książek w przypadku błędu
        })
      );
  }

  /**
   * Pobierz książki w konkretnej liście użytkownika (oryginalna funkcja)
   * @param listId ID listy
   * @returns Observable zawierający książki w liście
   */
  getBooksInList(listId: number): Observable<any> {
    const userId = this.authService.getUserId(); // Pobieramy userId z tokenu

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/user/${userId}/lists-with-books`) // Endpoint API zwracający wszystkie listy z książkami
      .pipe(
        tap((response) => console.log('Odpowiedź z API:', response)), // Logowanie odpowiedzi
        catchError((error) => {
          console.error('Błąd podczas pobierania książek:', error); // Obsługa błędów
          return of({ books: [] }); // Zwracamy pustą tablicę książek w przypadku błędu
        })
      );
  }

  /**
   * Dodaj książkę do wybranej listy użytkownika
   * @param payload Obiekt zawierający listId, bookId
   * @returns Observable odpowiedzi z serwera
   */
  addBookToList(payload: { listId: number; bookId: number }): Observable<any> {
    const userId = this.authService.getUserId(); // Pobieramy userId z tokenu

    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http.post(`${this.baseUrl}/add-book-to-list`, {
      userId,
      ...payload,
    });
  }

  /**
   * Usuń książkę z wybranej listy użytkownika
   * @param listId ID listy
   * @param bookId ID książki
   * @returns Observable odpowiedzi z serwera
   */
  removeBookFromList(
    userId: number,
    listId: number,
    bookId: number
  ): Observable<any> {
    // Sprawdzamy, czy userId, listId i bookId są dostępne
    if (!userId || !listId || !bookId) {
      throw new Error('Niepoprawne dane: brak userId, listId lub bookId');
    }

    // Poprawna ścieżka URL dla usuwania książki
    return this.http.delete(
      `${this.baseUrl}/remove-book-from-list/${userId}/${listId}/${bookId}`
    );
  }

  /**
   * Sprawdź, czy użytkownik jest właścicielem listy
   * @param listId ID listy
   * @returns Observable, który zawiera informację, czy użytkownik jest właścicielem listy
   */

  checkIfUserIsListOwner(listId: number): Observable<boolean> {
    const userId = this.authService.getUserId();

    if (!userId) {
      return of(false); // Jeśli użytkownik nie jest zalogowany, zwróć false
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/user/${userId}/lists-with-books`)
      .pipe(
        map((lists: any[]) => {
          const list = lists.find((list) => list.idListy === listId);
          return list ? list.idUzytkownik === userId : false;
        }),
        catchError(() => of(false)) // W przypadku błędu, zwróć false
      );
  }
}
