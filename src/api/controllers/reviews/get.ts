import { Handler } from 'express';

import { Review } from '../../../entities/Review';
import { appDataSource } from '../../../ormConfig';

export const get: Handler = async (req, res) => {
	try {
		const reviews = await appDataSource.manager.find(Review);

		res.status(200).send(reviews);
	} catch (error) {
		res.status(500).send('Unable to get users');
		return;
	}
};
