import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UpdatePasswordModel } from 'src/app/models/update-password.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css'],
  providers: [MessageService]
})
export class UserResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  userId: string | undefined;

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private dialogService: DynamicDialogConfig,
    private userService: UserService) {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let user: ShortUserInfo = this.dialogService.data.user;
    this.userId = user.id;
  }

  generatePassword() {
    const newPassword = this.userService.generatePassword();
    this.passwordForm.patchValue({ password: newPassword });
    this.copyToClipboard(newPassword);
    this.messageService.add({severity:'info', summary: 'Новый пароль сгенерирован', detail: 'Пароль скопирован в буфер обмена'});
  }

  copyToClipboard(password: string) {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  onSave() {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.value.password;
      let model: UpdatePasswordModel = {
        id: this.userId,
        password: newPassword,
      }
      this.userService.resetPassword(model).subscribe(() => {
        this.messageService.add({severity:'success', summary: 'Успех', detail: 'Пароль успешно обновлен'});
        this.ref.close(true)
      });
      
    }
  }

  onCancel() {
    this.passwordForm.reset();
  }
}
