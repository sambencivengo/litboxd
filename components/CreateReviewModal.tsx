import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Image,
	Button,
	ModalFooter,
	Flex,
	Textarea,
	VStack,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { CreateBookReview } from '../src/schema';
import { BookForDatabase } from '../src/types';
import { colors } from '../theme';
import { useReview } from './Context/ReviewProvider';
import { StarRatingButtonContainer } from './StarRating';

interface CreateReviewModalProps {
	reviewModalIsOpen: boolean;
	book: BookForDatabase;
	closeReviewModal: () => void;
}

export const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
	closeReviewModal,
	reviewModalIsOpen,
	book,
}) => {
	const { rateBook, reviews } = useReview();

	const existingReview = reviews.find(
		(review) => review.bookWorkKey === book.bookWorkKey
	);
	const coverImage = book.cover
		? `${BOOK_COVER_BASE_URL}${book.cover}-M.jpg`
		: '/no-cover.png';
	return (
		<Modal
			size={'xl'}
			isOpen={reviewModalIsOpen}
			onClose={closeReviewModal}
		>
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
						gap={100}
						justifyContent={'space-around'}
						direction={{ base: 'column', sm: 'row' }}
					>
						<Image
							objectFit="contain"
							maxW="100px"
							src={coverImage}
							alt="Book Cover"
							fallbackSrc="https://via.placeholder.com/150"
						/>

						<Formik
							validateOnChange={false}
							validateOnBlur={false}
							initialValues={{ reviewContent: '' }}
							validationSchema={CreateBookReview.uiSchema}
							onSubmit={async ({ reviewContent }) => {
								// const success = await rateBook({
								// 	author,
								// 	bookWorkKey,
								// 	cover: book.covers[0],
								// 	rating: existingReview.rating,
								// 	title: book.title,
								// 	reviewContent,
								// });
							}}
						>
							{({ isSubmitting, errors, handleChange }) => {
								return (
									<Form>
										<VStack>
											<FormControl
												isInvalid={
													!!errors.reviewContent
												}
												id="reviewContent"
											>
												<Textarea
													onChange={handleChange}
													id="reviewContent"
													placeholder="Write your review here..."
													name="reviewContent"
												/>

												<FormErrorMessage
													color={colors.deepRed}
												>
													{errors.reviewContent}
												</FormErrorMessage>
											</FormControl>

											<StarRatingButtonContainer
												book={book}
											/>

											<Button
												isDisabled={
													existingReview
														? false
														: true
												}
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
								);
							}}
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
