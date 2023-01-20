import { Handler } from 'express';
import { User } from '../../../entities';
import { appDataSource } from '../../../ormConfig';

export const me: Handler = async (req, res) => {
	const { userId } = req.session;

	try {
		const user = await appDataSource.manager.findOne(User, {
			where: {
				id: userId ?? null,
			},
		});

		console.log({ userId }, user);

		if (!user) {
			res.status(400).send('Unable to validate user');
			return;
		}
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to get user');
	}
};
