import { Handler } from 'express';
import { Review } from '../../../entities';
import { EditBookReview } from '../../../schema';
import { validate } from '../../../utils';

export const put: Handler = async (req, res) => {
	const { user } = req;
	const { bookWorkKey } = req.params;

	const { rating, errorHandled, reviewContent } =
		await validate<EditBookReview.ApiValues>({
			req,
			res,
			schema: EditBookReview.apiSchema,
		});

	if (errorHandled) return;

	try {
		const review = await req.em.findOne(Review, {
			bookWorkKey: bookWorkKey as string,
			user: user.id,
		});

		if (!review) {
			res.status(400).send('Unable to find review');
			return;
		}

		review.rating = rating;
		review.reviewContent = reviewContent;

		await req.em.persistAndFlush(review);

		res.status(200).send(review);
	} catch (error) {
		res.status(500).send(`Unable to modify book review: ${error}`);
		return;
	}
};
