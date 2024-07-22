import { Role } from "./role.model";

export interface ShortUserInfo {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    role: Role;
  }
  