import request from '@/utils/request';
import { Result, Token, User } from '@/api/types';
import { AxiosPromise } from 'axios';

export const login = (data: any): AxiosPromise<Result<Token>> =>
    request({
        url: '/auth/login',
        method: 'post',
        data,
    });

export const logout = (): AxiosPromise<Result<null>> =>
    request({
        url: '/auth/logout',
        method: 'delete',
    });

export const getUserInfo = (): AxiosPromise<Result<User>> =>
    request({
        url: '/auth/',
        method: 'get',
    });
