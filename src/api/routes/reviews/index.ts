import { Router } from 'express';
import Controllers from '../../controllers';
import { userMiddleware } from '../../middleware';
import { bookWorkKey } from './[:bookWorkKey]';

export const reviews = Router({ mergeParams: true });

reviews.use('/:bookWorkKey', bookWorkKey);

reviews.use(userMiddleware);
reviews.get('/', Controllers.Reviews.get);
reviews.post('/', Controllers.Reviews.postOrPut);
