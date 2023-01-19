import { Router } from 'express';
import { get } from '../controllers/reviews';

export const reviews = Router();

reviews.get('/', get);
