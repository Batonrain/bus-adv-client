import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.PlaylistApi;
  }

  getBucketFolders(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getBucketFolders?name=${name}`);
  }

  getCityRoutes(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getCityRoutes?cityId=${id}`);
  }
}
