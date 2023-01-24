import {
	Card,
	Center,
	Stack,
	CardBody,
	Heading,
	Divider,
	Image,
	Text,
	CardFooter,
	Button,
	Box,
	useDisclosure,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { AiFillEye } from 'react-icons/ai';
import { BOOK_COVER_BASE_URL } from '../constants';
import { CreateReviewModal } from './CreateReviewModal';
import { SignUpAndLoginModal } from './SignUpAndLoginModal';
import { StarRatingButtonContainer } from './StarRating';
import { Book } from '../pages/book/[book-work-key]';
import { useReadingList, useUser } from './Context';

interface BookWithDetailsProps {
	book: Book;
	author: string | string[] | null;
	bookWorkKey: string | string[];
	imageSize: 'S' | 'M' | 'L';
}

export const BookWithDetails: React.FC<BookWithDetailsProps> = ({
	bookWorkKey,
	book,
	author,
	imageSize,
}) => {
	const { user } = useUser();
	const { addToReadingList, removeFromReadingList, readingList } =
		useReadingList();

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

	const bookIsOnList = readingList.find(
		(book) => book.bookWorkKey === bookWorkKey
	)
		? colors.green
		: null;

	const coverImage = Object.hasOwn(book, 'covers')
		? `${BOOK_COVER_BASE_URL}${book.covers[0]}-${imageSize}.jpg`
		: '/no-cover.png';

	return (
		<Card
			bgColor={colors.darkBlue}
			direction={['column', 'column', 'row', 'row']}
			overflow="hidden"
			variant="outline"
			w={'auto'}
		>
			<Center>
				<Image
					objectFit="contain"
					maxW={{ base: '100%', sm: '200px' }}
					src={coverImage} // TODO: fix bug with lack of covers
					alt="Book Cover"
					fallbackSrc="https://via.placeholder.com/150"
				/>
			</Center>

			<Stack>
				<CardBody>
					<Stack gap={1}>
						<Heading size="md">{book.title}</Heading>
						{author && <Heading size="sm">by {author}</Heading>}
					</Stack>
					<Divider />

					{book.description && (
						<Text py="2">{book.description.value}</Text>
					)}
				</CardBody>

				<CardFooter>
					{/* TODO: review/rating and fetch request to create review */}
					<Stack
						alignItems="center"
						w={'100%'}
						direction={isMobile ? 'column' : 'row'}
						spacing={5}
					>
						<Box>
							{user ? (
								<StarRatingButtonContainer
									title={book.title}
									cover={
										Object.hasOwn(book, 'covers')
											? book.covers[0]
											: undefined
									}
									author={author}
									bookWorkKey={bookWorkKey}
								/>
							) : (
								<Button onClick={openLoginModal}>
									Log in to give rating
								</Button>
							)}
						</Box>
						{user && (
							<Stack direction={['row', 'row', 'column', 'row']}>
								<Button onClick={openReviewModal}>
									Write Review?
								</Button>
								<Button
									leftIcon={<AiFillEye fontSize={30} />}
									color={bookIsOnList ? colors.green : null}
									onClick={() =>
										bookIsOnList
											? removeFromReadingList({
													bookWorkKey,
											  })
											: addToReadingList({
													author,
													bookWorkKey,
													cover: Object.hasOwn(
														book,
														'covers'
													)
														? book.covers[0]
														: undefined,
													title: book.title,
											  })
									}
								>
									{bookIsOnList ? 'Remove' : 'Read'}
								</Button>
							</Stack>
						)}
					</Stack>
					<CreateReviewModal
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
