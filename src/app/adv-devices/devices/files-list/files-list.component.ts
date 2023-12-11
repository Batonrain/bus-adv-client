import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SetStartupVideo } from 'src/app/models/set-startup-video-for-device.model';
import { DevicesService } from 'src/app/services/devices.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  videos: any;
  loading: boolean = true;
  bucket: string = "";
  prefix: string = "";
  device: string = "";

  constructor(
    private dialogService: DynamicDialogConfig,
    private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.bucket = this.dialogService.data.bucket;
    this.prefix = this.dialogService.data.prefix;
    this.device = this.dialogService.data.device;

    this.playlistService
      .getObjects(this.bucket, this.prefix)
      .subscribe({
        next: videos => {
          this.videos = videos;
          this.loading = false;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  setStartupVideo(fileName: string) {
    let model: SetStartupVideo = {
      device: this.device,
      video: fileName,
    };
    console.log("SetStartupVideo", model);
    this.playlistService.setStartVideoForDevice(model)
      .subscribe({
        next: result => {
          console.log(result)
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
