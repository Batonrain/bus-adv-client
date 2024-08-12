import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShortUserInfo } from '../models/short-user-info.model';
import { Role } from '../models/role.model';
import { UpdateUserInfo } from '../models/update-user-info.model';
import { CreateUserInfo } from '../models/create-user-info.model';
import { UpdatePasswordModel } from '../models/update-password.model';
import { CreateWatcherModel } from '../models/create-watcher.models';
import { WatcherInfoModel } from '../models/watcher-info.model';
import { AddDevicesToWatcherModel } from '../models/add-devices-to-watcher.model';
import { WatcherDeviceModel } from '../models/watcher-device.model';

@Injectable({
  providedIn: 'root'
})
export class WatcherService {

  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.WatcherApi;
  }

  get(): Observable<WatcherInfoModel[]> {
    return this.http.get<WatcherInfoModel[]>(`${this.baseUrl}/watchers`);
  }

  getDevices(): Observable<WatcherDeviceModel[]> {
    return this.http.get<WatcherDeviceModel[]>(`${this.baseUrl}/devices`);
  }

  create(user: CreateWatcherModel): Observable<WatcherInfoModel> {
    return this.http.post<WatcherInfoModel>(`${this.baseUrl}/create`, user);
  }

  update(user: UpdateUserInfo): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  resetPassword(model: UpdatePasswordModel): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/update-password`, model);
  }

  updateDevices(model: AddDevicesToWatcherModel): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-devices`, model);
  }

  generatePassword(): string {
    const length = 12; // Длина пароля
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  
    let password = '';
    for (let i = 0; i < length - 4; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    // Обязательно добавляем по одному символу каждого типа
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
  
    // Перемешиваем пароль, чтобы символы не были в предсказуемом порядке
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }
}
