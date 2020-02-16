export interface Result<T> {
    code: number;
    message?: string;
    data?: T;
}

export interface Page<T> {
    total: number;
    data: T[];
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

export interface Article {
    id: number;
    title: string;
    author: string;
    status: string;
    createAt: string | number;
    viewerCount: number;
}
