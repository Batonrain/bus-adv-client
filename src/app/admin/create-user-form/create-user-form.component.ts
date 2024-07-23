import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserInfo } from 'src/app/models/create-user-info.model';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {
  userForm: FormGroup;
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
      email: ['test@mail.com', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  onSave(): void {
    if (this.userForm.valid) {
      let user: CreateUserInfo = {
        firstName: this.userForm.value.firstName,
        secondName: this.userForm.value.secondName,
        email: this.userForm.value.email,
        roleId: this.userForm.value.role.id,
        password: this.userForm.value.password,
      };
      this.userService.createUser(user).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
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

  generatePassword() {
    let password = this.userService.generatePassword();
    this.userForm.patchValue({ password: password });
  }
}
