import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.models';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.CityApi;
   }

  get(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/GetAll`);
  }

  // Создать новый город
  create(city: City): Observable<City> {
    return this.http.post<City>(this.baseUrl, city);
  }

  // Обновить существующий город
  update(id: number, city: City): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, city);
  }

  // Удалить город по ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
