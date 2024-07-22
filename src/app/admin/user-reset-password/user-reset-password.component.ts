import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent {
  @Input() visible: boolean = false;
  @Input() user: ShortUserInfo | null = null;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  onResetPassword(): void {
    if (this.user) {
      // this.userService.resetPassword(this.user.id).subscribe(newPassword => {
      //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset successfully' });
      //   // Display the new password to the user in a way they can copy it
      //   this.messageService.add({ severity: 'info', summary: 'New Password', detail: newPassword });
      //   this.onClose.emit();
      // });
    }
  }
}
