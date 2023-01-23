import { Handler } from 'express';
import { Review } from '../../../entities';

export const put: Handler = async (req, res) => {
	const { user } = req;
	const { bookWorkKey } = req.query;

	try {
		const review = await req.em.findOne(Review, {
			bookWorkKey: bookWorkKey as string,
			user: user.id,
		});

		if (!review) {
			res.status(400).send('Unable to find review');
			return;
		}

		res.status(200).send(review);
	} catch (error) {
		res.status(500).send(`Unable to modify book review: ${error}`);
		return;
	}
};
