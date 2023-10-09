import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllocationType } from '../models/allocation-type.models';

@Injectable({
  providedIn: 'root'
})
export class AllocationsService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.AllocationType;
   }

  get(): Observable<AllocationType[]> {
    return this.http.get<AllocationType[]>(`${this.baseUrl}/GetAll`);
  }

  create(allocationType: AllocationType): Observable<AllocationType> {
    return this.http.post<AllocationType>(this.baseUrl, allocationType);
  }

  update(id: number, allocationType: AllocationType): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, allocationType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
