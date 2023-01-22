import { Router } from 'express';
import Controllers from '../controllers';
import { userMiddleware } from '../middleware';

export const readingList = Router();

readingList.use(userMiddleware);
readingList.post('', Controllers.ReadingList.post);
readingList.get('', Controllers.ReadingList.get);
readingList.delete('', Controllers.ReadingList.destroy);
