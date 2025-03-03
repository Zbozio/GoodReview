import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatunekService {
  private apiUrl = 'https://localhost:7272/api/Gatuneks';

  constructor(private http: HttpClient) {}

  getGatuneks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getGatunek(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addGatunek(gatunek: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, gatunek);
  }

  updateGatunek(id: number, gatunek: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, gatunek);
  }

  deleteGatunek(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
