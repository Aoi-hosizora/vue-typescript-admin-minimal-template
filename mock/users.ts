import faker from 'faker';
import { Response, Request } from 'express';
import { User } from '../src/api/types';

const userList: User[] = [
    {
        id: 0,
        username: 'admin',
        password: '111111',
        name: 'Super Admin',
        avatar: 'https://panjiachen.github.io/vue-element-admin-site/home.png',
        roles: ['admin'],
    },
    {
        id: 1,
        username: 'editor',
        password: '111111',
        name: 'Normal Editor',
        avatar: 'https://panjiachen.github.io/vue-element-admin-site/home.png',
        roles: ['editor'],
    },
];
for (let i = 2; i < 100; i++) {
    userList.push({
        id: i,
        username: 'user_' + faker.random.alphaNumeric(9),
        password: faker.random.alphaNumeric(20),
        name: faker.name.findName(),
        avatar: faker.image.imageUrl(),
        roles: ['visitor'],
    });
}

export function login(req: Request, res: Response) {
    const { username } = req.body;
    for (const user of userList) {
        if (user.username === username) {
            return res.json({
                code: 20000,
                data: {
                    token: username + '-token', // admin-token && editor-token
                },
            });
        }
    }
    return res.status(400).json({
        code: 50004,
        message: 'Invalid User',
    });
}

export function logout(req: Request, res: Response) {
    return res.json({
        code: 20000,
    });
}

export function currentUser(req: Request, res: Response) {
    return res.json({
        code: 20000,
        data: req.header('X-Access-Token') === 'admin-token' ? userList[0] : userList[1],
    });
}
