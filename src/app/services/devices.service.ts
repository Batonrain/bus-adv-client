import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) { }

  getDevices(): Observable<any> {
    return this.http.get(environment.ApiBase + 'devices')
  }

  addDevice(body: any): Observable<any> {
    return this.http.post(environment.ApiBase + 'add_new_device', body)
  }

  getObjects(bucket: string, prefix: string): Observable<any> {
    return this.http.get(environment.ApiBase + 'objects', {
      params: {
        bucket: bucket,
        prefix: prefix
      }
    })
  }

  getCities(): Observable<any> {
    return this.http.get(environment.ApiBase + 'cities')
  }

  addCity(body: any): Observable<any> {
    return this.http.post(environment.ApiBase + 'add_city', body)
  }

  getTypesOfAllocations(): Observable<any> {
    return this.http.get(environment.ApiBase + 'types_of_allocation')
  }
}
