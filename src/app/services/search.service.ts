import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() {}

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  resetSearchQuery(): void {
    this.searchQuerySubject.next('');
  }
}
