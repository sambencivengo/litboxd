import { Handler } from 'express';
import { CreateAndLoginUser } from '../../../schema';
import { validate } from '../../../utils';
import * as argon2 from 'argon2';
import { User } from '../../../entities';

export const login: Handler = async (req, res) => {
	const { password, username, errorHandled } =
		await validate<CreateAndLoginUser.ApiValues>({
			req,
			res,
			schema: CreateAndLoginUser.apiSchema,
		});

	if (errorHandled) return;

	try {
		const user = await req.em.findOne(User, {
			username,
		});

		if (!user) {
			res.status(403).send('Unable to find account');
			return;
		}
		const validPassword = await argon2.verify(user.password, password);

		if (!validPassword) {
			res.status(400).send('Invalid password');
			return;
		}

		req.session.userId = user.id;

		res.send({
			id: user.id,
			username: user.username,
		});
	} catch (error) {
		res.status(500).send('Unable to log in to account');
	}
};
