import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VideoStreamComponent } from '../video-stream/video-stream.component';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
  providers: [DialogService]
})
export class DevicesListComponent implements OnInit {

  constructor(
    private deviceService: DevicesService,
    public dialogService: DialogService){} 

  public devices: any
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.deviceService.getDevices()
    .subscribe({
      next: result => {
        this.devices = result.devices;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  show() {
    this.ref = this.dialogService.open(VideoStreamComponent, { 
      header: 'Прямая трансляция',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        url: 'http://vpn.indoortv116.ru/kinograd'
      }
    });
  }

  getSeverity(status: any): string {
    if(status.isOnline == true){
      return 'success'
    }
    return 'danger'
  }
}
