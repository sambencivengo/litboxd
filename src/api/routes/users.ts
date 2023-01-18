import { Router } from 'express';
import Controllers from '../controllers';

export const users = Router();

users.get('', Controllers.Users.get);
