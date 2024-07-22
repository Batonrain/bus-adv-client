import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/models/role.model';
import { ShortUserInfo } from 'src/app/models/short-user-info.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;
  roles: Role[] | undefined;

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
      let user = this.userForm.value;
      if (user) {
        user.id = this.userId;
        console.log(`user to update:`, user)
        this.userService.updateUser(user).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
        });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe(roles => {
      console.log('Roles', roles);
      this.roles = roles;
    });
  }
}
