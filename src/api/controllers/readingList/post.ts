import { Handler } from 'express';
import { ReadingList } from '../../../entities';
import { AddBookToReadingList } from '../../../schema';
import { validate } from '../../../utils';

export const post: Handler = async (req, res) => {
	const { user } = req;

	const { bookWorkKey, title, cover, author, errorHandled } =
		await validate<AddBookToReadingList.ApiValues>({
			req,
			res,
			schema: AddBookToReadingList.apiSchema,
		});

	if (errorHandled) return;

	try {
		const readingListExists = await req.em.count(ReadingList, {
			bookWorkKey,
			user: user.id,
		});

		if (readingListExists) {
			res.status(400).send('Review cannot exist more than once');
			return;
		}

		const bookForReadingList = req.em.create(ReadingList, {
			bookWorkKey,
			title,
			cover,
			user: user.id,
			author,
		});

		await req.em.persistAndFlush(bookForReadingList);

		res.send(bookForReadingList);
	} catch (error) {
		res.status(500).send(`Unable to add book to reading list: ${error}`);
		console.log(error);
		return;
	}
};
