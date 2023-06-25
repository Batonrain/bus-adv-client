import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  videos: any;
  loading: boolean = true;

  constructor(
    private dialogService: DynamicDialogConfig,
    private deviceService: DevicesService)
    {}

  ngOnInit(): void {
    this.deviceService.getObjects(this.dialogService.data.bucket, this.dialogService.data.prefix)
      .subscribe({
        next: videos => {
          this.videos = videos.videos;
          this.loading = false;
          console.log(this.videos)
        },
        error: err => {
          console.log(err);
        }
      });
  }

  downloadFile(){}
  deleteFile(){}
}
