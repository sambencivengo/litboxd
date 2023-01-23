import { Handler } from 'express';
import { ReadingList } from '../../../entities';

export const destroy: Handler = async (req, res) => {
	const { user } = req;
	const { bookWorkKey } = req.query;

	try {
		const readingListItem = await req.em.find(ReadingList, {
			user: user.id,
			bookWorkKey: bookWorkKey as string,
		});

		if (!readingListItem) {
			res.sendStatus(404);
			return;
		}

		await req.em.remove(readingListItem).flush();

		res.send(readingListItem);
	} catch (error) {
		res.status(500).send(
			`Unable to remove book from reading list: \n${error}`
		);
		return;
	}
};
