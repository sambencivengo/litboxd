import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { CreateAndLoginUser } from '../src/schema';
import { InputField } from './InputField';

interface SignUpModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface SignUpFormArgs {
	username: string;
	password: string;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
	isOpen,
	onClose,
}) => {
	const toast = useToast();
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Sign Up for Litboxd</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{ username: '', password: '' }}
						validationSchema={CreateAndLoginUser.uiSchema}
						onSubmit={async (args: SignUpFormArgs) => {
							const res = await fetch('/api/users/register', {
								method: 'POST',
								headers: {
									'content-type': 'application/json',
								},
								body: JSON.stringify(args),
								credentials: 'include',
							});

							if (!res.ok) {
								toast({
									title: `Unable to sign up`,
									status: 'error',
									variant: 'solid',
									duration: 2000,
									isClosable: true,
									position: 'top',
								});
								return;
							}
							onClose();
							// TODO: update user store
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<VStack spacing={10}>
									<InputField
										label="Username"
										name="username"
										isRequired={true}
									/>
									<InputField
										label="Password"
										name="password"
										isRequired={true}
									/>

									<Button
										isLoading={isSubmitting}
										type="submit"
									>
										Submit
									</Button>
								</VStack>
							</Form>
						)}
					</Formik>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
