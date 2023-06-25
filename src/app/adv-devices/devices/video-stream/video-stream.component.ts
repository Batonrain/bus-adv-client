import { Component } from '@angular/core';
import { DynamicDialogConfig  } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent {

  url: string = '';
  constructor(
    private dialogService: DynamicDialogConfig,
    private domSanitizer: DomSanitizer) {
  }

  getUrl(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.dialogService.data.url);
  }

}
