import { Router } from 'express';
import Controllers from '../../../controllers';

export const bookWorkKey = Router({ mergeParams: true });

bookWorkKey.put('', Controllers.Reviews.put);
