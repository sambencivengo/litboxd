import { Handler } from 'express';
import { Review } from '../../../entities';

export const getBooksReviews: Handler = async (req, res) => {
	const { bookWorkKey } = req.params;
	const { userId } = req.session;

	try {
		let reviews: Review[];
		if (!userId) {
			reviews = await req.em.find(
				Review,
				{
					bookWorkKey,
				},

				{
					populate: ['user'],
					fields: [
						'author',
						'bookWorkKey',
						'cover',
						'id',
						'likes',
						'reviewContent',
						'rating',
						'reviewContent',
						'user.id',
						'user.username',
					],
				}
			);
		} else {
			reviews = await req.em.find(
				Review,
				{
					bookWorkKey,
					user: {
						id: { $nin: [userId] },
					},
				},

				{
					populate: ['user'],
					fields: [
						'author',
						'bookWorkKey',
						'cover',
						'id',
						'likes',
						'reviewContent',
						'rating',
						'reviewContent',
						'user.id',
						'user.username',
					],
				}
			);
		}

		// Shuffle results and show only 6
		const shuffledResults = reviews.sort(() => 0.5 - Math.random());
		const resultArrayOfReviews = shuffledResults.slice(0, 6);

		res.send(resultArrayOfReviews);
	} catch (error) {
		res.status(500).send('Unable to get reviews for this book');
	}
};
