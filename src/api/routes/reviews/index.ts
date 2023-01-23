import { Router } from 'express';
import Controllers from '../../controllers';
import { userMiddleware } from '../../middleware';
import { bookWorkKey } from './[:bookWorkKey]';

export const reviews = Router({ mergeParams: true });

reviews.use(userMiddleware);
reviews.use('/:bookWorkKey', bookWorkKey);
reviews.get('/', Controllers.Reviews.get);
reviews.post('/', Controllers.Reviews.post);
