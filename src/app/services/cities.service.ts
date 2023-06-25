import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(environment.ApiBase + 'cities')
  }

  add(body: any): Observable<any> {
    return this.http.post(environment.ApiBase + 'add_city', body)
  }

  edit(body: any): Observable<any> {
    return this.http.post(environment.ApiBase + 'edit_city', body)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.ApiBase + 'delete_city', {
      params: {
        id: id
      }
    })
  }
}
