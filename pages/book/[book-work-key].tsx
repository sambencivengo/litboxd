import {
	Image,
	Center,
	Spinner,
	Heading,
	Card,
	CardBody,
	Text,
	CardFooter,
	Stack,
	Divider,
	HStack,
	Button,
	useDisclosure,
	IconButton,
	useBreakpointValue,
	Box,
} from '@chakra-ui/react';
import { AiFillEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import React from 'react';
import { SignUpAndLoginModal } from '../../components/SignUpAndLoginModal';
import { StarRatingButtonContainer } from '../../components/StarRating';
import { BOOK_COVER_BASE_URL, BOOK_URL } from '../../constants';
import { CreateReviewModal } from '../../components/CreateReviewModal';
import { useReadingList, useUser } from '../../components/Context';
import { colors } from '../../theme';

export interface Book {
	title: string;
	covers?: number[];
	subjects: string[];
	description?: {
		value: string;
	};
}

export default function BookWorkKey() {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState<Book>(null);
	const [author, setAuthor] = React.useState<string | string[] | null>(null);

	const {
		isOpen: loginModalIsOpen,
		onOpen: openLoginModal,
		onClose: closeLoginModal,
	} = useDisclosure();

	const {
		isOpen: reviewModalIsOpen,
		onOpen: openReviewModal,
		onClose: closeReviewModal,
	} = useDisclosure();

	const bookWorkKey = router.query['book-work-key'];
	const { user } = useUser();
	const { readingList } = useReadingList();

	React.useEffect(() => {
		setIsLoading(true);
		const getBookInfo = async () => {
			const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
			const data = await res.json();

			setBook(data);
			setAuthor(router.query.author);
		};

		setIsLoading(false);

		if (router.isReady) {
			getBookInfo();
		}
	}, [bookWorkKey, router.query.author, router.isReady]);

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	const bookIsOnList = readingList.find(
		(book) => book.bookKey === bookWorkKey
	)
		? colors.green
		: null;

	const addToReadingList = async () => {
		const res = await fetch(`/api/readingList`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				bookKey: bookWorkKey,
				author,
			}),
			credentials: 'include',
		});

		await res.json();
	};

	const removeFromReadingList = async () => {
		const res = await fetch(`/api/readingList?${bookWorkKey}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'include',
		});

		await res.json();
	};

	return (
		<>
			<main>
				{book && (
					<Card
						bgColor={colors.darkBlue}
						direction={['column', 'column', 'row']}
						overflow="hidden"
						variant="outline"
						w={'auto'}
					>
						<Center>
							{Object.hasOwn(book, 'covers') && (
								<Image
									objectFit="contain"
									maxW={{ base: '100%', sm: '200px' }}
									src={`${BOOK_COVER_BASE_URL}${book.covers[0]}-L.jpg`} // TODO: fix bug with lack of covers
									alt="Book Cover"
									fallbackSrc="https://via.placeholder.com/150"
								/>
							)}
						</Center>

						<Stack>
							<CardBody>
								<Stack gap={1}>
									<Heading size="md">{book.title}</Heading>
									{author && (
										<Heading size="sm">by {author}</Heading>
									)}
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
											<StarRatingButtonContainer />
										) : (
											<Button onClick={openLoginModal}>
												Log in to give rating
											</Button>
										)}
									</Box>
									{user && (
										<HStack>
											<Button onClick={openReviewModal}>
												Write Review?
											</Button>
											<Button
												leftIcon={
													<AiFillEye fontSize={30} />
												}
												color={
													bookIsOnList
														? colors.green
														: null
												}
												onClick={
													bookIsOnList
														? removeFromReadingList
														: addToReadingList
												}
											>
												{bookIsOnList
													? 'Remove'
													: 'Read'}
											</Button>
										</HStack>
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
				)}
			</main>
		</>
	);
}
