import * as yup from 'yup';

const schema = yup.object({
	bookKey: yup.string().trim().required('Book key is required'),
	author: yup.string().trim().required('Author is required'),
});

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
