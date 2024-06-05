import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserAuth } from '../models/user-auth.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.UserApi;
  }

  login(username: string, password: string): Observable<UserAuth> {
    return this.http.post<UserAuth>(
      this.baseUrl + '/login',
      {
        Username: username,
        Password: password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    console.log("logout")
    return this.http.post(environment.ApiBase + 'logout', {}, httpOptions);
  }
}
