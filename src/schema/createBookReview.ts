import * as yup from 'yup';

export const schema = yup.object({
	reviewContent: yup.string().trim(),
	bookWorkKey: yup.string().trim().required('Book work key is required'),
	author: yup.string().trim().required('Author is required'),
	title: yup.string().trim().required('Title is required'),
	cover: yup.string().trim().required('Cover is required'),
	rating: yup
		.number()
		.min(0, 'Rating cannot be lower than zero')
		.max(5, 'Rating cannot be higher than five'),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
