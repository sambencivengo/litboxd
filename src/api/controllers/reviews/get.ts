import { Handler } from 'express';
import { Review } from '../../../entities/Review';

export const get: Handler = async (req, res) => {
	const { user } = req;
	try {
		const reviews = await req.em.find(Review, {
			user: user.id,
		});

		res.status(200).send(reviews);
	} catch (error) {
		res.status(500).send('Unable to get users');
		return;
	}
};
