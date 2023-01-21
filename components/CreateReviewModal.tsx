import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	VStack,
	Image,
	Button,
	ModalFooter,
	Card,
	Flex,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { Book } from '../pages/book/[book-work-key]';
import { CreateAndLoginUser } from '../src/schema';
import { colors } from '../theme';
import { InputField } from './InputField';
import { SignUpAndLoginFormArgs } from './SignUpAndLoginModal';

interface CreateReviewModalProps {
	reviewModalIsOpen: boolean;
	book: Book;
	closeReviewModal: () => void;
}

export const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
	closeReviewModal,
	reviewModalIsOpen,
	book,
}) => {
	return (
		<Modal isOpen={reviewModalIsOpen} onClose={closeReviewModal}>
			<ModalOverlay
				bg="whiteAlpha.200"
				backdropFilter="auto"
				backdropBlur="5px"
			/>

			<ModalContent top={50}>
				<ModalHeader color={colors.white} bgColor={colors.darkBlue}>
					Review Modal Header
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody bgColor={colors.darkBlue}>
					<Flex
						justifyContent={'space-between'}
						direction={{ base: 'column', sm: 'row' }}
					>
						<Image
							objectFit="contain"
							maxW={{ base: '100%', sm: '200px' }}
							src={`${BOOK_COVER_BASE_URL}${book.covers[0]}-L.jpg`}
							alt="Book Cover"
						/>
						<Formik
							validateOnChange={false}
							validateOnBlur={false}
							initialValues={{ username: '', password: '' }}
							validationSchema={CreateAndLoginUser.uiSchema}
							onSubmit={async (args: SignUpAndLoginFormArgs) => {
								console.log(args);
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<VStack spacing={10}>
										{/* TODO: build review */}

										<InputField
											label="Description"
											name="description"
											isRequired={true}
										/>

										<Button
											bgColor={colors.green}
											color={colors.white}
											_hover={{
												backgroundColor:
													colors.greyBlue,
											}}
											isLoading={isSubmitting}
											type="submit"
										>
											Submit
										</Button>
									</VStack>
								</Form>
							)}
						</Formik>
					</Flex>
				</ModalBody>

				<ModalFooter bgColor={colors.darkBlue}>
					<Button mr={3} onClick={closeReviewModal}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
