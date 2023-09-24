import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



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
      environment.ApiBase + 'login',
      {
        username: username,
        password: password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    console.log("logout")
    return this.http.post(environment.ApiBase + 'logout', { }, httpOptions);
  }
}
