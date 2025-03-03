import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UzytkownikDTO } from '../models/UzytkownikDTO';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl: string = `https://localhost:7272/api/Register`;

  constructor(private http: HttpClient) {}

  register(userDto: UzytkownikDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, userDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
