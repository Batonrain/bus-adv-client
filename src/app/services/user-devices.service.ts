import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDevicesService {

  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.UserApi;
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
