import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';

@Component({
  selector: 'app-user-management',
  templateUrl: 'user-manager.component.html',
  styleUrls: ['user-manager.component.css'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class UserManagerComponent implements OnInit {
  users: ShortUserInfo[] = [];
  searchForm: FormGroup;
  selectedUser: ShortUserInfo | null = null;
  displayRoleDialog: boolean = false;
  displayResetPasswordDialog: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
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
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: ShortUserInfo): void {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: `Редактирование ${user.firstName} ${user.secondName}`,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        user: user,
        isNewUser: false,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  onAddUser(): void {
    this.ref = this.dialogService.open(CreateUserFormComponent, {
      header: `Добавить нового пользователя`,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadUsers();
      }
    });
  }


  onResetPassword(user: ShortUserInfo): void {
    this.selectedUser = user;
    this.displayResetPasswordDialog = true;
  }

  onDeleteUser(user: ShortUserInfo): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete user?`,
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.loadUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
        });
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
}