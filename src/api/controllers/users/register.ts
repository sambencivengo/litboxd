import { Handler } from 'express';
import { validate } from '../../../utils';
import { CreateUser } from '../../../schema';

export const register: Handler = async (req, res) => {
	const { password, username, errorHandled } =
		await validate<CreateUser.ApiValues>({
			req,
			res,
			schema: CreateUser.apiSchema,
		});

	if (errorHandled) return;

	try {
		res.send({ username, password });
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create new user');
	}
};
