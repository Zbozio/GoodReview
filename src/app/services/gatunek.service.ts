import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatunekService {
  private apiUrl = 'https://localhost:7272/api/Gatuneks'; // URL do API backendu

  constructor(private http: HttpClient) {}

  // Pobieranie listy gatunków
  getGatuneks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Pobieranie konkretnego gatunku
  getGatunek(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Dodawanie nowego gatunku
  addGatunek(gatunek: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, gatunek);
  }

  // Aktualizacja gatunku
  updateGatunek(id: number, gatunek: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, gatunek);
  }

  // Usuwanie gatunku
  deleteGatunek(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
