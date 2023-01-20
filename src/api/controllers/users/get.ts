import { Handler } from 'express';
import { User } from '../../../entities';

export const get: Handler = async (req, res) => {
	try {
		const users = await req.em.find(User, {});

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send('Unable to get users');
		return;
	}
};
