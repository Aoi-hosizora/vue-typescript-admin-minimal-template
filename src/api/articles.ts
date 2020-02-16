import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Article, Page, Result } from '@/api/types';

export const getArticles = (): AxiosPromise<Result<Page<Article>>> =>
    request({
        url: '/article',
        method: 'get',
    });
