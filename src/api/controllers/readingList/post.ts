import { Handler } from 'express';

export const post: Handler = (_, res) => {
	res.send('Hello');
};
