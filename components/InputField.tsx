import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	FormHelperText,
	Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { colors } from '../theme';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	isRequired?: true;
	helperText?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
	isRequired = false,
	label,
	size: _,
	helperText,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			{label && (
				<>
					<FormLabel htmlFor={field.name}>
						{label}
						{isRequired && ' *'}
					</FormLabel>
				</>
			)}
			<Input variant={'filled'} {...field} {...props} id={field.name} />
			{error && (
				<FormErrorMessage color={colors.deepRed}>
					{error}
				</FormErrorMessage>
			)}
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};
