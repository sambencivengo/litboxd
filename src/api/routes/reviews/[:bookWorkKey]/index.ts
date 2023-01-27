import { Router } from 'express';
import Controllers from '../../../controllers';
import { userMiddleware } from '../../../middleware';

export const bookWorkKey = Router({ mergeParams: true });

bookWorkKey.get('', Controllers.Reviews.getBooksReviews);
bookWorkKey.use(userMiddleware);
bookWorkKey.put('', Controllers.Reviews.put);
