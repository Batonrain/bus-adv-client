import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ShortUserInfo } from 'src/app/models/short-user-info,model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user: ShortUserInfo | null = null;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.user) {
        this.userService.updateUser(this.user.id, user).subscribe(() => {
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
}
