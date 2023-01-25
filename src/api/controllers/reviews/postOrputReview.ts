import { Handler } from 'express';
import { Review } from '../../../entities';
import { CreateBookReview } from '../../../schema';
import { validate } from '../../../utils';

export const postOrPut: Handler = async (req, res) => {
	const { user } = req;

	const { reviewContent, bookWorkKey, author, title, cover, rating } =
		await validate<CreateBookReview.ApiValues>({
			req,
			res,
			schema: CreateBookReview.apiSchema,
		});

	try {
		const existingReview = await req.em.findOne(Review, {
			bookWorkKey: bookWorkKey as string,
			user: user.id,
		});

		if (existingReview) {
			existingReview.reviewContent = reviewContent;
			existingReview.rating = rating;
			await req.em.persistAndFlush(existingReview);

			res.status(200).send(existingReview);
			return;
		} else {
			const newReview = req.em.create(Review, {
				author,
				bookWorkKey,
				title,
				cover,
				rating,
				reviewContent,
				user: user.id,
			});

			await req.em.persistAndFlush(newReview);
			res.status(200).send(newReview);
		}
	} catch (error) {
		res.status(500).send(`Unable to review book: ${error}`);
		return;
	}
};
