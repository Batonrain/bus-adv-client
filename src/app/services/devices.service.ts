import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device.models';
import { ChangeDeviceNetNameModel } from '../models/change-device-net-name.models';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.DeviceApi;
  }

  get(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}`);
  }

  reboot(deviceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reboot-device/${deviceId}`);
  }

  create(device: Device): Observable<Device> {
    return this.http.post<Device>(this.baseUrl, device);
  }

  update(id: number, device: Device): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, device);
  }

  updateNetName(model: ChangeDeviceNetNameModel): Observable<boolean> {
    console.log(`${this.baseUrl}/ChangeDeviceName`);
    return this.http.post<boolean>(`${this.baseUrl}/ChangeDeviceName`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
