import * as yup from 'yup';

const schema = yup.object({
	bookWorkKey: yup.string().trim().required('Book work key is required'),
	author: yup.string().trim().required('Author is required'),
	title: yup.string().trim().required('Title is required'),
	cover: yup.number(),
});

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
