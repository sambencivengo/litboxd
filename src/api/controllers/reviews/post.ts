import { Handler } from 'express';
import { Review } from '../../../entities';
import { CreateBookReview } from '../../../schema';
import { validate } from '../../../utils';

export const post: Handler = async (req, res) => {
	const { user } = req;

	const {
		author,
		title,
		cover,
		bookWorkKey,
		rating,
		reviewContent,
		errorHandled,
	} = await validate<CreateBookReview.ApiValues>({
		req,
		res,
		schema: CreateBookReview.apiSchema,
	});

	if (errorHandled) return;

	try {
		const reviewExists = await req.em.count(Review, {
			bookWorkKey,
			user: user.id,
		});

		if (reviewExists) {
			res.status(400).send('Review cannot exist more than once');
			return;
		}

		const review = req.em.create(Review, {
			author,
			bookWorkKey,
			title,
			cover,
			rating,
			reviewContent,
			user: user.id,
		});

		await req.em.persistAndFlush(review);

		res.status(200).send(review);
	} catch (error) {
		res.status(500).send(`Unable to rate or review book: ${error}`);
		return;
	}
};
