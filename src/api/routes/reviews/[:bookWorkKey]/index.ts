import { Router } from 'express';
import { UseMiddleware } from 'type-graphql';
import Controllers from '../../../controllers';

export const bookWorkKey = Router({ mergeParams: true });

bookWorkKey.get('', Controllers.Reviews.getBooksReviews);
bookWorkKey.use(UseMiddleware);
bookWorkKey.put('', Controllers.Reviews.put);
