import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeOfAuthorService {
  private apiUrl = 'https://localhost:7272/api/AddingBook/roles';

  constructor(private http: HttpClient) {}

  getTypes(): Observable<TypeOfAuthor[]> {
    return this.http.get<TypeOfAuthor[]>(this.apiUrl);
  }
}

export interface TypeOfAuthor {
  idTypu: number;
  nazwaTypu: string;
}
