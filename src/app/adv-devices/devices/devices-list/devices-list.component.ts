import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VideoStreamComponent } from '../video-stream/video-stream.component';
import { Table } from 'primeng/table';
import { FilesListComponent } from '../files-list/files-list.component';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CitiesService } from 'src/app/services/cities.service';

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

  addNewDevice(): void {
    this.ref = this.dialogService.open(AddDeviceComponent, {
      header: 'Добавление нового устройства',
      width: '50%',
      height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,
      closable: true,
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Устройство успешно добавлено' });
      }
    });
  }

  editDevice(device: any): void {
    this.ref = this.dialogService.open(AddDeviceComponent, {
      header: 'Редактирование нового устройства',
      width: '50%',
      height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,
      closable: true,
      data: {
        id: device.Id,
        device: device,
        isEdit: true,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Устройство успешно обновлено' });
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

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: any): string {
    if (status.isOnline == true) {
      return 'success'
    }
    return 'danger'
  }
}
