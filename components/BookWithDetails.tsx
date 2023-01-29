import {
	Card,
	Center,
	Stack,
	CardBody,
	Heading,
	Divider,
	Image,
	CardFooter,
	Button,
	Box,
	useDisclosure,
	useBreakpointValue,
	IconButton,
	HStack,
} from '@chakra-ui/react';
import { BsPencilSquare } from 'react-icons/bs';
import React from 'react';
import { colors } from '../theme';
import { AiFillEye } from 'react-icons/ai';
import { BOOK_COVER_BASE_URL } from '../constants';
import { CreateReviewModal } from './CreateReviewModal';
import { SignUpAndLoginModal } from './SignUpAndLoginModal';
import { StarRatingButtonContainer } from './StarRating';
import { useReadingList, useReview, useUser } from './Context';
import { BookForDatabase } from '../src/types';

interface BookWithDetailsProps {
	book: BookForDatabase;
	imageSize: 'S' | 'M' | 'L';
}

export const BookWithDetails: React.FC<BookWithDetailsProps> = ({
	book,
	imageSize,
}) => {
	const [starRating, setStarRating] = React.useState<number>(0);
	const [bookIsOnList, setBookIsOnList] = React.useState(false);
	const isMobile = useBreakpointValue({ base: true, md: false });

	const {
		isOpen: reviewModalIsOpen,
		onOpen: openReviewModal,
		onClose: closeReviewModal,
	} = useDisclosure();
	const {
		isOpen: loginModalIsOpen,
		onOpen: openLoginModal,
		onClose: closeLoginModal,
	} = useDisclosure();

	const { user } = useUser();

	const { addToReadingList, removeFromReadingList, readingList } =
		useReadingList();

	const { reviews } = useReview();

	const existingReview = reviews.find(
		(review) => review.bookWorkKey === book.bookWorkKey
	);

	React.useEffect(() => {
		if (
			readingList.find(
				(readingListBook) =>
					readingListBook.bookWorkKey === book.bookWorkKey
			)
		) {
			setBookIsOnList(true);
		}

		if (existingReview) {
			setStarRating(existingReview.rating);
		}
	}, [existingReview, book, readingList, setStarRating]);

	const handleOptimisticFetch = async (action: 'add' | 'remove') => {
		let success: boolean;
		action === 'remove'
			? (success = await removeFromReadingList({
					bookWorkKey: book.bookWorkKey,
			  }))
			: (success = await addToReadingList({
					author: book.author,
					bookWorkKey: book.bookWorkKey,
					cover: book.cover,
					title: book.title,
			  }));

		if (!success) {
			setBookIsOnList(action === 'remove' ? true : false);
		}
	};

	return (
		<Card
			w={'100%'}
			direction={['column', 'column', 'row']}
			overflow="scroll"
			bgColor={colors.darkBlue}
			variant="outline"
		>
			<Center>
				<Image
					objectFit="contain"
					maxW={{ base: '100%', sm: '200px' }}
					src={
						book.cover
							? `${BOOK_COVER_BASE_URL}${book.cover}-${imageSize}.jpg`
							: 'https://via.placeholder.com/150'
					}
					alt="Book Cover"
					fallbackSrc="https://via.placeholder.com/150"
				/>
			</Center>

			<Stack w={'100%'}>
				<CardBody>
					<Stack gap={1}>
						<Heading color={colors.white} size="md">
							{book.title}
						</Heading>
						{book.author && (
							<Heading color={colors.white} size="sm">
								by {book.author}
							</Heading>
						)}
					</Stack>
					<Divider />

					{/* TODO: update how description is managed... */}
					{/* {book.description && (
						<Text py="2">{book.description.value}</Text>
					)} */}
				</CardBody>

				<CardFooter>
					<Stack
						alignItems="center"
						w={'100%'}
						direction={isMobile ? 'column' : 'row'}
						spacing={5}
					>
						<Box>
							{user ? (
								<StarRatingButtonContainer
									setStarRating={setStarRating}
									starRating={starRating}
									submitOnStarClick={true}
									book={book}
								/>
							) : (
								<Button onClick={openLoginModal}>
									Log in to give rating
								</Button>
							)}
						</Box>
						{user && (
							<HStack>
								<IconButton
									onClick={openReviewModal}
									aria-label="Create review"
									icon={<BsPencilSquare />}
								/>

								<Button
									leftIcon={<AiFillEye fontSize={30} />}
									color={bookIsOnList ? colors.green : null}
									onClick={() => {
										setBookIsOnList(!bookIsOnList);

										handleOptimisticFetch(
											bookIsOnList ? 'remove' : 'add'
										);
									}}
								>
									{bookIsOnList ? 'Remove' : 'Read'}
								</Button>
							</HStack>
						)}
					</Stack>
					<CreateReviewModal
						existingReview={existingReview}
						book={book}
						closeReviewModal={closeReviewModal}
						reviewModalIsOpen={reviewModalIsOpen}
					/>
					<SignUpAndLoginModal
						loginModalIsOpen={loginModalIsOpen}
						closeLoginModal={closeLoginModal}
						purpose={'log in'}
					/>
				</CardFooter>
			</Stack>
		</Card>
	);
};
