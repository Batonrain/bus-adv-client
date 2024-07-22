import { Role } from "./role.model";

export interface ShortUserInfo {
    id: string;
    firstName: string;
    secondName: string;
    email: string;
    role: Role;
  }
  