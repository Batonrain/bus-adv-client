import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) { }

  getDevices(): Observable<any>{
    return this.http.get(environment.ApiBase + 'devices')
  }

  getObjects(bucket: string, prefix:string): Observable<any>{
    console.log(bucket, prefix);
    return this.http.get(environment.ApiBase + 'objects', {
      params: {
        bucket: bucket,
        prefix: prefix
      }})
  }
}
