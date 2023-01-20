import { Router } from 'express';
import Controllers from '../controllers';

export const users = Router();

users.get('', Controllers.Users.get);
users.post('/register', Controllers.Users.register);
users.post('/login', Controllers.Users.login);
users.get('/me', Controllers.Users.me);
