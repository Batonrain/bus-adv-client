import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/models/role.model';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UpdateUserInfo } from 'src/app/models/update-user-info.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string | undefined;
  roles: Role[] | undefined;
  isNewUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let user: ShortUserInfo = this.dialogService.data.user;
    this.loadRoles();
    this.userId = user.id;
    this.userForm.patchValue(user);
    if (user && this.roles) {
      const userRole = this.roles.find(role => role.id === user.role.id);
      this.userForm.patchValue({
        ...user,
        role: userRole
      });
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      let user: UpdateUserInfo = {
        id: this.userId,
        firstName: this.userForm.value.firstName,
        secondName: this.userForm.value.secondName,
        email: this.userForm.value.email,
        roleId: this.userForm.value.role.id
      };
      this.userService.updateUser(user).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
        this.ref.close(true)
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
}
