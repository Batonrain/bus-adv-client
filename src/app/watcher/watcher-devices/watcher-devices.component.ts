import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WatcherService } from 'src/app/services/watcher.service';
import { WatcherVideoComponent } from '../watcher-video/watcher-video.component';

@Component({
  selector: 'app-watcher-devices',
  templateUrl: './watcher-devices.component.html',
  styleUrl: './watcher-devices.component.css',
  providers: [DialogService, MessageService],
})
export class WatcherDevicesComponent implements OnInit {
  public constructor(
    public messageService: MessageService,
    public dialogService: DialogService,
    public watcherService: WatcherService) { }

  ref: DynamicDialogRef | undefined;
  devices: any[] = [];

  ngOnInit(): void {
    this.watcherService.getAvailableDevices().subscribe({
      next: devices => {
        this.devices = devices;
        console.log(devices);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  showTranslation(id: number, name: string, url: string): void {
    this.ref = this.dialogService.open(WatcherVideoComponent, {
      header: 'Прямая трансляция',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        id: id,
        url: url,
        name: name,
      }
    });
  }
}
