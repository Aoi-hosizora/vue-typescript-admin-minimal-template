import express, { Request, Response } from 'express';
import { currentUser, login, logout } from './users';
import { getArticles } from './articles';

const route = express.Router();

// user
route.post('/auth/login', login);
route.delete('/auth/logout', logout);
route.get('/auth/', currentUser);

// article
route.get('/article', getArticles);

// 404
route.use((req: Request, res: Response, _) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found',
    });
});

export default route;
