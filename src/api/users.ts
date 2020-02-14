import request from '@/utils/request';

export const login = (data: any) =>
    request({
        url: '/users/login',
        method: 'post',
        data,
    });

export const logout = () =>
    request({
        url: '/users/logout',
        method: 'post',
    });

export const getUserInfo = (token: string) =>
    request({
        url: '/users/info',
        method: 'post',
        params: { token },
    });
