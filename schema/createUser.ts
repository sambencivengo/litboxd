import * as yup from 'yup';

const schema = yup.object({
	username: yup.string().trim().required('Service Request is required'),
	password: yup.string().trim(),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();
export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
