import { Handler } from 'express';
import { Review } from '../../../entities';

export const getBooksReviews: Handler = async (req, res) => {
	const { bookWorkKey } = req.params;
	try {
		const reviews = await req.em.find(Review, {
			bookWorkKey,
		});

		res.send(reviews);
	} catch (error) {
		res.status(500).send('Unable to get reviews for this book');
	}
};
