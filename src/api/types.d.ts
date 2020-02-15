export interface Result<T> {
    code: number;
    message?: string;
    data?: T;
}

export interface Token {
    token: string;
}

export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    avatar: string;
    roles: string[];
}
