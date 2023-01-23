import { Router } from 'express';
import { readingList } from './readingList';
import { reviews } from './reviews';

import { users } from './users';

export const api = Router({ mergeParams: true });

api.use('/users', users);
api.use('/reviews', reviews);
api.use('/readingList', readingList);
