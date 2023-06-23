import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }
    
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username: username,
        password: password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    console.log("logout")
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }
}
