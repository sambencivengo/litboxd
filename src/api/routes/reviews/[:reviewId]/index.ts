import { Router } from 'express';
import Controllers from '../../../controllers';

export const reviewId = Router();

reviewId.put('', Controllers.Reviews.put);
