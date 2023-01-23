import * as yup from 'yup';

export const schema = yup.object({
	reviewContent: yup.string().trim(),
	rating: yup
		.number()
		.min(0, 'Rating cannot be lower than zero')
		.max(5, 'Rating cannot be higher than five'),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
