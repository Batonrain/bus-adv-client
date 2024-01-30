import { Component } from '@angular/core';
import { DynamicDialogConfig  } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoImageService } from 'src/app/services/video-image.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent {

  url: string = '';
  constructor(
    private videoService: VideoImageService,
    private dialogService: DynamicDialogConfig,
    private domSanitizer: DomSanitizer) {
  }

  getUrl(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.dialogService.data.url);
  }

  getFrame(){
    this.videoService.getCurrentFrame(this.dialogService.data.url).subscribe(blob => {
      console.log("Blob", blob);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const date = new Date();
      const fileName = `frame-${date.getFullYear()}${this.pad(date.getMonth() + 1)}${this.pad(date.getDate())}_${this.pad(date.getHours())}${this.pad(date.getMinutes())}.jpg`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    
  }

  private pad(number: number) {
    return number < 10 ? '0' + number : number;
  }

}
