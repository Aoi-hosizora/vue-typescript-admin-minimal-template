import express, { Request, Response } from 'express';
import { currentUser, login, logout } from './users';

const route = express.Router();

// user
route.post('/auth/login', login);
route.delete('/auth/logout', logout);
route.get('/auth/', currentUser);

// 404
route.use((req: Request, res: Response, _) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found',
    });
});

export default route;
