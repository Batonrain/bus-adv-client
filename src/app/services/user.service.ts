import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShortUserInfo } from '../models/short-user-info.model';
import { Role } from '../models/role.model';
import { UpdateUserInfo } from '../models/update-user-info.model';
import { CreateUserInfo } from '../models/create-user-info.model';

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
    return this.http.get<ShortUserInfo[]>(`${this.baseUrl}/users`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  createUser(user: CreateUserInfo): Observable<ShortUserInfo> {
    return this.http.post<ShortUserInfo>(`${this.baseUrl}/create`, user);
  }

  updateUser(user: UpdateUserInfo): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateUserRole(id: string, role: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/role`, { role });
  }

  resetPassword(id: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${id}/reset-password`, {});
  }
}
