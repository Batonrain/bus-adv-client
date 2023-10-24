import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VideoStreamComponent } from '../video-stream/video-stream.component';
import { Table } from 'primeng/table';
import { FilesListComponent } from '../files-list/files-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CitiesService } from 'src/app/services/cities.service';
import { Device } from 'src/app/models/device.models';
import { ChangeDeviceNameComponent } from '../change-device-name/change-device-name.component';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class DevicesListComponent implements OnInit {
  constructor(
    public deviceService: DevicesService,
    public citiesService: CitiesService,
    public dialogService: DialogService,
    public messageService: MessageService) { }

  public devices: Device[] = [];
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.deviceService.get()
      .subscribe({
        next: result => {
          this.devices = result;
          console.log(this.devices);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  filter(table: Table, text: any): void {
    table.filterGlobal(text.value, 'contains');
  }

  showFiles(name: string, bucket: string, prefix: string): void {
    this.ref = this.dialogService.open(FilesListComponent, {
      header: 'Плейлист ' + name,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        bucket: bucket,
        prefix: prefix
      }
    });
  }

  showTranslation(url: string): void {
    this.ref = this.dialogService.open(VideoStreamComponent, {
      header: 'Прямая трансляция',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        url: url
      }
    });
  }

  showChangeNetName(name: string):void{
    this.ref = this.dialogService.open(ChangeDeviceNameComponent, {
      header: 'Изменить сетевое имя ',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        currentName: name
      }
    });
  }

  getShortName(name:string): string{
    return name.replace('.local', '');
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(isOnline: boolean): string {
    if (isOnline) {
      return 'success'
    }
    return 'danger'
  }

  getStatusText(isOnline: boolean): string {
    if (isOnline) {
      return 'Онлайн'
    }
    return 'Оффлайн'
  }
}
