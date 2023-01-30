import {
	Modal,
	ModalOverlay,
	ModalContent,
	chakra,
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
	Text,
	useToast,
	Box,
	Link,
	Container,
	Heading,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { Review } from '../src/entities';
import { CreateBookReview } from '../src/schema';
import { BookForDatabase } from '../src/types';
import { colors } from '../theme';
import { useReview } from './Context/ReviewProvider';
import { StarRatingButtonContainer } from './StarRating';

interface CreateReviewModalProps {
	reviewModalIsOpen: boolean;
	existingReview: Review;
	book: BookForDatabase;
	closeReviewModal: () => void;
}

export const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
	closeReviewModal,
	reviewModalIsOpen,
	existingReview,
	book,
}) => {
	const [starRating, setStarRating] = React.useState<number>(0);
	const { rateBook, reviews, editReview } = useReview();
	const toast = useToast();

	React.useEffect(() => {
		if (existingReview) {
			setStarRating(existingReview.rating);
		}
	}, [existingReview, setStarRating, reviews]);

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
				<ModalHeader
					color={colors.white}
					bgColor={colors.darkBlue}
				></ModalHeader>
				<ModalCloseButton />
				<ModalBody bgColor={colors.darkBlue}>
					<Flex
						gap={5}
						justify="center"
						justifyContent={'space-evenly'}
						direction={{ base: 'column', sm: 'row' }}
					>
						<VStack>
							<Image
								objectFit="contain"
								maxW="100px"
								src={
									book.cover
										? `${BOOK_COVER_BASE_URL}${book.cover}-L.jpg`
										: 'https://via.placeholder.com/150'
								}
								alt="Book Cover"
								fallbackSrc="https://via.placeholder.com/150"
							/>
							<Heading
								textAlign="center"
								size={'sm'}
								fontStyle="italic"
							>
								{book.title}
							</Heading>
							<Heading size="sm">by {book.author}</Heading>
						</VStack>
						<Container w={'70%'}>
							<Formik
								validateOnChange={false}
								validateOnBlur={false}
								initialValues={{
									reviewContent: existingReview.reviewContent
										? existingReview.reviewContent
										: '',
									author: book.author as string,
									bookWorkKey: book.bookWorkKey as string,
									cover: book.cover,
									rating: 0,
									title: book.title,
								}}
								validationSchema={CreateBookReview.uiSchema}
								onSubmit={async ({ reviewContent }) => {
									existingReview
										? editReview({
												bookWorkKey:
													existingReview.bookWorkKey,
												rating: starRating,
												reviewContent,
										  })
										: rateBook({
												author: book.author as string,
												bookWorkKey:
													book.bookWorkKey as string,
												cover: book.cover,
												rating: starRating,
												title: book.title,
												reviewContent,
										  });
									closeReviewModal();
									toast({
										position: 'top',
										duration: 4000,
										isClosable: true,
										render: () => (
											<Box p={2} bgColor={colors.green}>
												<Text>
													<chakra.span fontStyle="italic">
														{book.title} added to{' '}
													</chakra.span>
													<Link
														textDecoration={
															'underline'
														}
														href={`/reviews`}
													>
														your reviews
													</Link>
												</Text>
											</Box>
										),
									});
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
														defaultValue={
															existingReview.reviewContent ??
															''
														}
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

												{/* TODO: Remove from reading list checkbox 
											that sends a query parameter to post, this query param then finds 
											and deletes the book from the reading list */}
												{/* {existingReview && (
												<Checkbox
													defaultChecked
													type="checkbox"
												>
													Remove from reading list?
												</Checkbox>
											)} */}

												<StarRatingButtonContainer
													setStarRating={
														setStarRating
													}
													starRating={starRating}
													book={book}
													submitOnStarClick={false}
												/>

												<Button
													isDisabled={
														starRating > 0
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
						</Container>
					</Flex>
				</ModalBody>

				<ModalFooter bgColor={colors.darkBlue}></ModalFooter>
			</ModalContent>
		</Modal>
	);
};
