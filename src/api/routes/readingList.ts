import { Router } from 'express';
import Controllers from '../controllers';

export const readingList = Router();

readingList.post('', Controllers.ReadingList.post);
readingList.get('', Controllers.ReadingList.get);
