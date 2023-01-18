import { Handler } from 'express';
import { User } from '../../../entities';
import { appDataSource } from '../../../ormConfig';

export const get: Handler = async (_, res) => {
	try {
		const users = await appDataSource.manager.find(User);

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send('Unable to get users');
		return;
	}
};
