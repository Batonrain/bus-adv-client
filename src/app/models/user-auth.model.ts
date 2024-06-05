export interface UserAuth {
    token: string;
    roles: string[];
    userName: string;
    expiration: Date;
}