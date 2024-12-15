import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Zapewnia globalny dostęp do serwisu
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>(''); // Trzymamy zapytanie w BehaviorSubject
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() {}

  // Metoda do ustawiania zapytania
  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  // Metoda do resetowania zapytania
  resetSearchQuery(): void {
    this.searchQuerySubject.next('');
  }
}
