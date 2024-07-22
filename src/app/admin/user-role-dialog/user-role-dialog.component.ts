import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.css']
})
export class UserRoleDialogComponent {
  @Input() visible: boolean = false;
  @Input() user: ShortUserInfo | null = null;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  newRole: string = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  onSaveRole(): void {
    if (this.user && this.newRole) {
      this.userService.updateUserRole(this.user.id, this.newRole).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User role updated successfully' });
        this.onClose.emit();
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please provide a role' });
    }
  }
}
