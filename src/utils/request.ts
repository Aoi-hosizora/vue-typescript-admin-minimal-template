import axios, { AxiosResponse } from 'axios';
import { Message, MessageBox } from 'element-ui';
import { UserModule } from '@/store/modules/user';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
    // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
    (config) => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        if (UserModule.token) {
            config.headers['X-Access-Token'] = UserModule.token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error).then(null);
    },
);

// Response interceptors
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // Some example codes here:
        // code == 20000: success
        // code == 50001: invalid access token
        // code == 50002: already login in other place
        // code == 50003: access token expired
        // code == 50004: invalid user (user not exist)
        // code == 50005: username or password is incorrect
        // You can change this part for your own usage.
        const data = response.data;
        if (data.code !== 20000) {
            Message({
                message: data.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
            });
            if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning',
                    },
                ).then(() => {
                    UserModule.ResetToken();
                    location.reload(); // To prevent bugs from vue-router
                });
            }
            return Promise.reject(new Error(data.message || 'Error'));
        } else {
            return response;
        }
    },
    (error) => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
