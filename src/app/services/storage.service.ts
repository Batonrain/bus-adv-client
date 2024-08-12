import { Injectable } from '@angular/core';
import { UserAuth } from '../models/user-auth.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  TOKEN_NAME: string = 'token';
  ROLES: string = 'roles';
  EXPIRATION: string = 'expiration';
  USER_NAME: string = 'userName';
  constructor() { }

  clean(): void {
    window.localStorage.clear();
  }

  public saveUserInfo(saveUserInfo: UserAuth): void {
    window.localStorage.removeItem(this.TOKEN_NAME);
    window.localStorage.setItem(this.TOKEN_NAME, saveUserInfo.token);
    
    window.localStorage.removeItem(this.ROLES);
    window.localStorage.setItem(this.ROLES, JSON.stringify(saveUserInfo.roles));

    window.localStorage.removeItem(this.EXPIRATION);
    window.localStorage.setItem(this.EXPIRATION, JSON.stringify(saveUserInfo.expiration));

    window.localStorage.removeItem(this.USER_NAME);
    window.localStorage.setItem(this.USER_NAME, JSON.stringify(saveUserInfo.userName));
  }

  public getUser(): string {
    const user = window.localStorage.getItem(this.USER_NAME);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }

  public getRoles(): string[] {
    const roles = window.localStorage.getItem(this.ROLES);
    if (roles) {
      return JSON.parse(roles);
    }

    return [];
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(this.TOKEN_NAME);
    if (user) {
      return true;
    }

    return false;
  }
}
