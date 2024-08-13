import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Личный кабинет';
  isAdmin: boolean = false;
  isWatcher: boolean = false;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    let isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) {
      let roles = this.storageService.getRoles();
      this.isAdmin = this.containsAdmin(roles);
      this.isWatcher = this.containsWatcher(roles);
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  containsAdmin(strings: string[]): boolean {
    return strings.some(str => str.toLowerCase() === 'admin');
  }

  containsWatcher(strings: string[]): boolean {
    return strings.some(str => str.toLowerCase() === 'watcher');
  }
}
