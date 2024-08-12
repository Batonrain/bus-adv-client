import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { WatcherInfoModel } from 'src/app/models/watcher-info.model';
import { UserService } from 'src/app/services/user.service';
import { WatcherService } from 'src/app/services/watcher.service';
import { CreateWatcherFormComponent } from '../create-watcher-form/create-watcher-form.component';
import { DevicesService } from 'src/app/services/devices.service';
import { Device } from 'src/app/models/device.models';
import { AddDevicesToWatcherModel } from 'src/app/models/add-devices-to-watcher.model';
import { WatcherDeviceModel } from 'src/app/models/watcher-device.model';
import { EditWatcherFormComponent } from '../edit-watcher-form/edit-watcher-form.component';

@Component({
  selector: 'app-watchers-table',
  templateUrl: './watchers-table.component.html',
  styleUrls: ['./watchers-table.component.css'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class WatchersTableComponent implements OnInit {
  watchers: WatcherInfoModel[] = [];
  searchForm: FormGroup;
  ref: DynamicDialogRef | undefined;
  public devices: WatcherDeviceModel[] = [];

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public watcherService: WatcherService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public deviceService: DevicesService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.loadWatchers();
    this.loadData();


  }

  loadWatchers(): void {
    this.watcherService.get().subscribe(watchers => {
      console.log(watchers);
      this.watchers = watchers;
    });
  }

  editWatcher(watcher: WatcherInfoModel): void {
    this.ref = this.dialogService.open(EditWatcherFormComponent, {
      header: `Редактирование ${watcher.name}`,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        watcher: watcher,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadWatchers();
      }
    });
  }

  onAddWatcher(): void {
    this.ref = this.dialogService.open(CreateWatcherFormComponent, {
      header: `Добавить нового пользователя`,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadWatchers();
      }
    });
  }

  saveDevices(watcher: WatcherInfoModel): void {
    let request: AddDevicesToWatcherModel = {
      watcherId: watcher.id,
      devices: watcher.devices.map(d => d.id.toString()),
    };
    console.log(request);
    this.watcherService.updateDevices(request).subscribe(
      () => {
        this.loadWatchers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Список устройств изменен' });
      }
    )
  }

  onDeleteWatcher(user: ShortUserInfo): void {
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить пользователя??`,
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.loadWatchers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Пользователь успешно удален' });
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отмена удаления', detail: 'Пользователь не будет удален' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена удаления', detail: 'Пользователь не будет удален' });
            break;
        }
      }
    });
  }

  loadData(): void {
    this.watcherService.getDevices()
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
