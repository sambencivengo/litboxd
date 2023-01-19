import { Handler } from 'express';

export const register: Handler = (req, res) => {
	const { username, password } = req.body;

	try {
		res.send('Hello');
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create new user');
	}
};
