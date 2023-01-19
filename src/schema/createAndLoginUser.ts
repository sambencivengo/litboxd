import * as yup from 'yup';

const schema = yup.object({
	username: yup.string().trim().required('Username is required'),
	password: yup
		.string()
		.trim()
		.min(8, 'Password must be at least 8 characters long'),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
