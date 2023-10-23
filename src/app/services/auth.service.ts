import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



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

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
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
