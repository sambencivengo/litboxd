import { Handler } from 'express';
import { ReadingList } from '../../../entities';
import { AddBookToReadingList } from '../../../schema';
import { validate } from '../../../utils';

export const post: Handler = async (req, res) => {
	const { user } = req;

	const { bookKey, author, errorHandled } =
		await validate<AddBookToReadingList.ApiValues>({
			req,
			res,
			schema: AddBookToReadingList.apiSchema,
		});

	if (errorHandled) return;
	try {
		const bookForReadingList = req.em.create(ReadingList, {
			bookKey,
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
