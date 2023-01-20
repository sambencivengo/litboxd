import { Handler } from 'express';

export const logout: Handler = (req, res) => {
	try {
		if (req.session) {
			req.session.destroy(() => res.sendStatus(200));
			console.log('after');
		} else {
			res.status(400).send('Unable to log out');
		}
	} catch (error) {
		res.status(500).send('Unable to logout');
	}
};
