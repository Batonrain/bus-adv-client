import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateWatcherModel } from 'src/app/models/update-watcher.model';
import { WatcherService } from 'src/app/services/watcher.service';

@Component({
  selector: 'app-edit-watcher-form',
  templateUrl: './edit-watcher-form.component.html',
  styleUrls: ['./edit-watcher-form.component.css']
})
export class EditWatcherFormComponent implements OnInit {
  watcherForm: FormGroup;
  userId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private watcherService: WatcherService,
    private messageService: MessageService,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {
    this.watcherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });    
  }

  ngOnInit(): void {
    let watcher: UpdateWatcherModel = this.dialogService.data.watcher;
    this.userId = watcher.id;
    this.watcherForm.patchValue(watcher);
  }

  onSave(): void {
    if (this.watcherForm.valid) {
      let watcher: UpdateWatcherModel = {
        id: this.userId,
        username: this.watcherForm.value.name,
        email: this.watcherForm.value.email
      };
      this.watcherService.update(watcher).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Пользовател успешно обновлен' });
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
