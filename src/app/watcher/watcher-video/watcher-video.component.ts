import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-watcher-video',
  templateUrl: './watcher-video.component.html',
  styleUrl: './watcher-video.component.css'
})
export class WatcherVideoComponent {
  constructor(
    private dialogService: DynamicDialogConfig,
    public messageService: MessageService,
    private domSanitizer: DomSanitizer) {
  }

  getUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.dialogService.data.url);
  }
}
