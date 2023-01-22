import { Handler } from 'express';
import { ReadingList } from '../../../entities';

export const get: Handler = async (req, res) => {
	const { user } = req;

	try {
		const readingList = await req.em.find(ReadingList, {
			user: user.id,
		});

		res.send(readingList);
	} catch (error) {
		res.status(500).send(`Unable to fetch reading list: ${error}`);
		console.log(error);
		return;
	}
};
