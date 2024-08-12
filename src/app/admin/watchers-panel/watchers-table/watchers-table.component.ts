import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { WatcherInfoModel } from 'src/app/models/watcher-info.model';
import { UserService } from 'src/app/services/user.service';
import { WatcherService } from 'src/app/services/watcher.service';
import { CreateWatcherFormComponent } from '../create-watcher-form/create-watcher-form.component';

@Component({
  selector: 'app-watchers-table',
  templateUrl: './watchers-table.component.html',
  styleUrls: ['./watchers-table.component.css'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class WatchersTableComponent implements OnInit {
  watchers: WatcherInfoModel[] = [];
  searchForm: FormGroup;
  selectedUser: ShortUserInfo | null = null;
  displayRoleDialog: boolean = false;
  displayResetPasswordDialog: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public watcherService: WatcherService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public dialogService: DialogService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.loadWatchers();
  }

  loadWatchers(): void {
    this.watcherService.get().subscribe(watchers => {
      console.log("loadWatchers", watchers);
      this.watchers = watchers;
    });
  }

  editWatcher(user: ShortUserInfo): void {
    // this.ref = this.dialogService.open(UserFormComponent, {
    //   header: `Редактирование ${user.firstName} ${user.secondName}`,
    //   width: '60%',
    //   contentStyle: { overflow: 'auto' },
    //   baseZIndex: 10000,
    //   maximizable: false,
    //   data: {
    //     user: user,
    //   }
    // });

    // this.ref.onClose.subscribe((result: boolean) => {
    //   if (result) {
    //     this.loadWatchers();
    //   }
    // });
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

  onAddDevices(): void {

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
}
