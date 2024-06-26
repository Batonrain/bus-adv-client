import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShortUserInfo } from '../models/short-user-info,model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.UserApi;
  }

  getTechnicians(): Observable<ShortUserInfo[]> {
    return this.http.get<ShortUserInfo[]>(`${this.baseUrl}`);
  }

  getUsers(): Observable<ShortUserInfo[]> {
    return this.http.get<ShortUserInfo[]>(this.baseUrl);
  }

  createUser(user: ShortUserInfo): Observable<ShortUserInfo> {
    return this.http.post<ShortUserInfo>(this.baseUrl, user);
  }

  updateUser(id: number, user: ShortUserInfo): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateUserRole(id: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/role`, { role });
  }

  resetPassword(id: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${id}/reset-password`, {});
  }
}
