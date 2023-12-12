import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeFolderNameModel } from '../models/change-folders-name.model';
import { SetStartupVideo } from '../models/set-startup-video-for-device.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.PlaylistApi;
  }

  getBucketFolders(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getBucketFolders?name=${name}`);
  }

  getCityRoutes(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getCityRoutes?cityId=${id}`);
  }

  updateFoldersNames(model: ChangeFolderNameModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateFoldersNames`, model);
  }

  getObjects(bucket: string, prefix: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBucketFiles`, {
      params: {
        bucket: bucket,
        prefix: prefix
      }
    })
  }

  setStartVideoForDevice(model: SetStartupVideo): Observable<string[]> {
    return this.http.post<any>(`${this.baseUrl}/setStartupVideoForDevice`, model);
  }
}
