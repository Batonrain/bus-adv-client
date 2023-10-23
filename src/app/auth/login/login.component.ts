import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    console.log("onSubmit")
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        console.log("login", data);
        this.storageService.saveUserInfo(data);
        console.log(this.storageService.getRoles())
        this.router.navigate(["/devices"]);
      },
      error: err => {
        console.log("Ошибка входа");
        this.showError(err.error.message);
        this.isLoginFailed = true;
      }
    });
  }

  showError(errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
}

  reloadPage(): void {
    window.location.reload();
  }
}