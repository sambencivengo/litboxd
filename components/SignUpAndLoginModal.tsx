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
import { colors } from '../theme';
import { InputField } from './InputField';

interface SignUpAndLoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	purpose: 'sign up' | 'log in';
}

export interface SignUpAndLoginFormArgs {
	username: string;
	password: string;
}

export const SignUpAndLoginModal: React.FC<SignUpAndLoginModalProps> = ({
	isOpen,
	onClose,
	purpose,
}) => {
	const toast = useToast();
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				bg="whiteAlpha.200"
				backdropFilter="auto"
				backdropBlur="5px"
			/>

			<ModalContent top={50}>
				<ModalHeader color={colors.white} bgColor={colors.darkBlue}>
					{purpose === 'sign up'
						? 'Sign Up for Litboxd'
						: 'Log in to Litboxd'}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody bgColor={colors.darkBlue}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{ username: '', password: '' }}
						validationSchema={CreateAndLoginUser.uiSchema}
						onSubmit={async (args: SignUpAndLoginFormArgs) => {
							const res = await fetch(
								`/api/users/${
									purpose === 'sign up' ? 'register' : 'login'
								}`,
								{
									method: 'POST',
									headers: {
										'content-type': 'application/json',
									},
									body: JSON.stringify(args),
									credentials: 'include',
								}
							);

							if (!res.ok) {
								toast({
									title: `Unable to ${
										purpose === 'sign up'
											? 'sign up'
											: 'log in'
									}`,
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
										type="password"
										label="Password"
										name="password"
										isRequired={true}
									/>

									<Button
										bgColor={colors.green}
										color={colors.white}
										_hover={{
											backgroundColor: colors.greyBlue,
										}}
										isLoading={isSubmitting}
										type="submit"
									>
										{purpose === 'sign up'
											? 'Sign Up'
											: 'Log In'}
									</Button>
								</VStack>
							</Form>
						)}
					</Formik>
				</ModalBody>

				<ModalFooter bgColor={colors.darkBlue}>
					<Button mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
