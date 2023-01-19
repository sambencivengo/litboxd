import { Request, Response } from 'express';
import * as yup from 'yup';

interface ValidateProps {
	schema: yup.AnySchema;
	data?: any;
	isArray?: boolean;
	req: Request;
	res: Response;
}

export const validate: <T>(
	args: ValidateProps
) => Promise<T & { errorHandled?: true }> = async ({
	schema,
	req,
	res,
	data,
	isArray,
}) => {
	const dataToValidate = data ?? req.body;

	const INVALID_KEYS_ERROR = 'Keys not allowed:';

	const modifiedSchema = schema.clone();

	try {
		return await modifiedSchema.validate(dataToValidate ?? req.body, {
			strict: true,
			abortEarly: false,
		});
	} catch (error: any) {
		let customError = (error as yup.ValidationError).message;

		if (error.inner.length > 1) {
			customError += `: \n${error.inner
				.map(({ message, path }: { message: string; path: string }) => {
					console.log(message, path);

					let errorText = message;
					if (isArray) {
						errorText += ` - ${path}`;
					}
					return errorText;
				})
				.join('\n')}`;
		}

		res.status(400).send(customError);
		return { errorHandled: true };
	}
};
