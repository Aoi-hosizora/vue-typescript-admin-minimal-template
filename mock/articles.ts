import Mock from 'mockjs';
import { Request, Response } from 'express';

const data: any[] = Mock.mock({
   'items|30': [{
       id: '@id',
       title: '@sentence(10, 20)',
       author: 'name',
       'status|1': ['published', 'draft', 'deleted'],
       viewerCount: '@integer(300, 5000)',
       createAt: '@datetime',
   }],
}).items;

export function getArticles(req: Request, res: Response) {
    return res.json({
        code: 20000,
        message: 'success',
        data: {
            total: data.length,
            data: data,
        },
    });
}
