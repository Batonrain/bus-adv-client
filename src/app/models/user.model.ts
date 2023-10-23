export interface User {
    token: string;
    roles: string[];
    userName: string;
    expiration: Date;
}