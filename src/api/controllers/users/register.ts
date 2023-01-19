import { Handler } from 'express';

export const register: Handler = (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);

	try {
		res.send(req.body);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create new user');
	}
};
