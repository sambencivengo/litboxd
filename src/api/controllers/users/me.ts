import { Handler } from 'express';
import { User } from '../../../entities';

export const me: Handler = async (req, res) => {
	const { userId } = req.session;

	try {
		const user = await req.em.findOne(User, {
			id: userId,
		});

		if (!user) {
			res.status(400).send('Unable to validate user');
			return;
		}
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to get user');
	}
};
