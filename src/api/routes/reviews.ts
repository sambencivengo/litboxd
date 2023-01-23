import { Router } from 'express';
import Controllers from '../controllers';
import { userMiddleware } from '../middleware';

export const reviews = Router();

reviews.use(userMiddleware);
reviews.get('/', Controllers.Reviews.get);
reviews.post('/', Controllers.Reviews.post);
