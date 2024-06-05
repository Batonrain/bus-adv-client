import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShortUserInfo } from 'src/app/models/short-user-info,model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: 'user-manager.component.html',
  styleUrls: ['user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  users: ShortUserInfo[] = [];
  filteredUsers: ShortUserInfo[] = [];
  searchForm: FormGroup;
  selectedUser: ShortUserInfo | null = null;
  displayRoleDialog: boolean = false;
  displayResetPasswordDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
      this.filteredUsers = users;
    });
  }

  onSearch(): void {
    const { name, email } = this.searchForm.value;
    this.filteredUsers = this.users.filter(user =>
      user.fullName.toLowerCase().includes(name.toLowerCase()) &&
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  onAddUser(): void {
    this.selectedUser = null;
    // Logic to show user form for adding a new user
  }

  onEditUser(user: ShortUserInfo): void {
    this.selectedUser = user;
    // Logic to show user form for editing user
  }

  onChangeRole(user: ShortUserInfo): void {
    this.selectedUser = user;
    this.displayRoleDialog = true;
  }

  onResetPassword(user: ShortUserInfo): void {
    this.selectedUser = user;
    this.displayResetPasswordDialog = true;
  }

  onDeleteUser(user: ShortUserInfo): void {
    // this.confirmationService.confirm({
    //   message: `Are you sure you want to delete user ${user.fullName}?`,
    //   accept: () => {
    //     this.userService.deleteUser(user.id).subscribe(() => {
    //       this.loadUsers();
    //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
    //     });
    //   }
    // });
  }
}