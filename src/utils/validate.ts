import { Request, Response } from 'express';
import * as yup from 'yup';

interface ValidateProps {
	schema: yup.AnySchema;
	data?: any;
	customResponse?: string;
	isArray?: boolean;
	keysRemovedFromLogs?: string[];
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
	customResponse,
	isArray,
	keysRemovedFromLogs,
}) => {
	const dataToValidate = data ?? req.body;

	const INVALID_KEYS_ERROR = 'Keys not allowed:';

	const modifiedSchema = schema.clone();
	if (!isArray)
		modifiedSchema.concat(yup.object().noUnknown(true, INVALID_KEYS_ERROR));

	try {
		return await modifiedSchema.validate(dataToValidate ?? req.body, {
			strict: true,
			abortEarly: false,
		});
	} catch (error: any) {
		const formData = { ...dataToValidate };
		for (const key of keysRemovedFromLogs ?? []) {
			delete formData[key];
		}

		let customError = (error as yup.ValidationError).message;

		if (error.inner.length > 1) {
			customError += `: \n${error.inner
				.map(({ message, path }: { message: string; path: string }) => {
					let errorText = message;
					if (isArray) {
						errorText += ` - ${path}`;
					}
					return errorText;
				})
				.join('\n')}`;
		}

		if (error.errors.includes(INVALID_KEYS_ERROR)) {
			const invalidKeysError = error.inner.find(
				(errorObj: yup.ValidationError) => errorObj.type === 'noUnknown'
			);
			customError += `\n${invalidKeysError.params.unknown}`;
		}
		res.status(400).send(customResponse ?? customError);
		return { errorHandled: true };
	}
};
