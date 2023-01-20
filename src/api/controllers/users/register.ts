import { Handler } from 'express';
import * as argon2 from 'argon2';
import { validate } from '../../../utils';
import { User } from '../../../entities';

import { CreateAndLoginUser } from '../../../schema';

export const register: Handler = async (req, res) => {
	const { password, username, errorHandled } =
		await validate<CreateAndLoginUser.ApiValues>({
			req,
			res,
			schema: CreateAndLoginUser.apiSchema,
		});

	if (errorHandled) return;

	try {
		const hashedPassword = await argon2.hash(password);
		const user = new User();
		user.username = username;
		user.password = hashedPassword;

		await req.em.persistAndFlush(user);

		req.session.userId = user.id;

		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create new user');
	}
};
