export interface Session {
    readonly id: string;
    readonly token: string;
    readonly expires: Date;
    readonly roles: string[];
    readonly username: string;
}
