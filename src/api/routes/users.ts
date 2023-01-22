import { Router } from 'express';
import Controllers from '../controllers';
import { userMiddleware } from '../middleware';

export const users = Router();

users.post('/login', Controllers.Users.login);
users.post('/register', Controllers.Users.register);

users.use(userMiddleware);
users.get('', Controllers.Users.get);
users.get('/me', Controllers.Users.me);
users.delete('/logout', Controllers.Users.logout);
