import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VideoStreamComponent } from '../video-stream/video-stream.component';
import { Table } from 'primeng/table';
import { FilesListComponent } from '../files-list/files-list.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
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
    public confirmationService: ConfirmationService,
    public messageService: MessageService) { }
  public sevDanger = 'danger';

  public devices: Device[] = [];
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.loadData();
  }

  filter(table: Table, text: any): void {
    table.filterGlobal(text.value, 'contains');
  }

  showTranslation(id: number, name: string): void {
    let deviceName = name.replace(".local", "");
    const url = `http://Vpn.indoortv116.ru/${deviceName}`;
    this.ref = this.dialogService.open(VideoStreamComponent, {
      header: 'Прямая трансляция',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        id: id,
        url: url,
        deviceName: deviceName,
      }
    });
  }

  showChangeNetName(name: string): void {
    this.ref = this.dialogService.open(ChangeDeviceNameComponent, {
      header: 'Изменить сетевое имя ',
      width: '60%',
      // height: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        currentName: name
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Имя устройства успешно изменено' });
      }
    });
  }

  showFileList(bucket: string, prefix: string, device: string): void {
    this.ref = this.dialogService.open(FilesListComponent, {
      header: 'Список файлов ',
      width: '70%',
      height: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        bucket: bucket,
        prefix: prefix,
        device: device,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: `Стартовый ролик для устройства ${device} успешно изменен` });
      }
    });
  }

  deleteRoute(id: number, routeName: string): void {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить маршрут ' + routeName + '?',
      header: 'Подверждение операции',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deviceService.delete(id).subscribe({
          next: result => {
            this.messageService.add({ severity: 'info', summary: 'Подтверждение удаления', detail: 'Устройство удалено' });
            window.location.reload();
          },
          error: err => {
            console.log(err);
          }
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отмена удаления', detail: 'Устройство не будет удалено' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена удаления', detail: 'Устройство не будет удалено' });
            break;
        }
      }
    });
  }

  rebootDevice(deviceId: number) {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите перезагрузить устройство?',
      header: 'Подверждение операции',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deviceService.reboot(deviceId).subscribe({
          next: result => {
            this.messageService.add({ severity: 'info', summary: 'Подтверждение перезагрузки', detail: 'Устройство будет скоро перезагружено' });
            window.location.reload();
          },
          error: err => {
            console.log(err);
          }
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отмена перезагрузки', detail: 'Устройство не будет перезагружено' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена перезагрузки', detail: 'Устройство не будет перезагружено' });
            break;
        }
      }
    });
  }

  getShortName(name: string): string {
    return name.replace('.local', '');
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(isOnline: boolean): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (isOnline) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'info'; // В качестве примера
    }
  }
  

  getStatusText(isOnline: boolean): string {
    if (isOnline) {
      return 'Онлайн'
    }
    return 'Оффлайн'
  }

  getOfflineTime(isOnline: boolean, time: string): any {
    if (!isOnline) {
      return new Date(time);
    }

    return '';
  }

  loadData(): void {
    this.deviceService.get()
      .subscribe({
        next: devices => {
          this.devices = devices;
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
