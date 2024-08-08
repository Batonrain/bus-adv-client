import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserInfo } from 'src/app/models/create-user-info.model';
import { CreateWatcherModel } from 'src/app/models/create-watcher.models';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/services/user.service';
import { WatcherService } from 'src/app/services/watcher.service';

@Component({
  selector: 'app-create-watcher-form',
  templateUrl: './create-watcher-form.component.html',
  styleUrls: ['./create-watcher-form.component.css']
})
export class CreateWatcherFormComponent implements OnInit {
  watcherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private watcherService: WatcherService,
    private messageService: MessageService,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {
    this.watcherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['test@mail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.watcherForm.valid) {
      let watcher: CreateWatcherModel = {
        username: this.watcherForm.value.name,
        email: this.watcherForm.value.email,
        password: this.watcherForm.value.password,
      };
      this.watcherService.create(watcher).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Пользователь успешно создан' });
        this.ref.close(true)
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Пожалуйста, заполните все поля' });
    }
  }

  generatePassword() {
    let password = this.watcherService.generatePassword();
    this.watcherForm.patchValue({ password: password });
  }
}
