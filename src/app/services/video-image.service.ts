import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoImageService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.ApiBase + environment.VideoApi;
  }

  getCurrentFrame(videoUrl: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetCurrentFrame?videoUrl=${encodeURIComponent(videoUrl)}`, { responseType: 'blob' });
  }
}
