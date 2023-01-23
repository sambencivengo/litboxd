import { Router } from 'express';
import Controllers from '../../controllers';
import { userMiddleware } from '../../middleware';
import { reviewId } from './[:reviewId]';

export const reviews = Router();

reviews.use(userMiddleware);
reviews.use('/:reviewId', reviewId);
reviews.get('/', Controllers.Reviews.get);
reviews.post('/', Controllers.Reviews.post);
