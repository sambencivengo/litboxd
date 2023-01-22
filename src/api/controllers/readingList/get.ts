import { Handler } from 'express';

export const get: Handler = async (req, res) => {
	console.log(req.user);

	res.send('Hello');
};
