import { Router } from 'express';

export const reviews = Router();

reviews.get('/', (_, res) => res.send('Hello from reviews route!'));
