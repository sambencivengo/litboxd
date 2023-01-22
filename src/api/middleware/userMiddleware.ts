import { Handler } from 'express';
import { User } from '../../entities';

export const userMiddleware: Handler = async (req, res, next) => {
	const { userId } = req.session;
	try {
		const user = await req.em.findOne(User, {
			id: userId,
		});

		if (!user) {
			res.status(403).send('Unable to validate user');
			return;
		}

		req.user = { username: user.username, id: user.id };
		next();
	} catch (error) {
		res.status(500).send('Unable to validate user');
	}
};
