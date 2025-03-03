import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = 'https://localhost:7272/api/Tagis';

  constructor(private http: HttpClient) {}

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTag(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addTag(tag: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tag);
  }

  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  assignTagsToBook(bookId: number, tagIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/assign-tags`;
    return this.http.post<any>(url, tagIds);
  }

  getTagsForBook(bookId: number): Observable<any> {
    const url = `${this.apiUrl}/${bookId}/Tags`;
    return this.http.get<any>(url);
  }
}
