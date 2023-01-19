import { Handler } from 'express';
import * as argon2 from 'argon2';
import { validate } from '../../../utils';
import { CreateUser } from '../../../schema';
import { User } from '../../../entities';
import { argon2d } from 'argon2';
import { appDataSource } from '../../../ormConfig';

export const register: Handler = async (req, res) => {
	const { password, username, errorHandled } =
		await validate<CreateUser.ApiValues>({
			req,
			res,
			schema: CreateUser.apiSchema,
		});

	if (errorHandled) return;

	try {
		const hashedPassword = await argon2.hash(password);
		const user = new User();
		user.username = username;
		user.password = hashedPassword;

		await appDataSource.manager.save(user);

		req.session.userId = user.id;

		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create new user');
	}
};
