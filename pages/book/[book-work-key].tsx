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
import { useUser } from '../../components/UserProvider';
import { BOOK_COVER_BASE_URL, BOOK_URL } from '../../constants';
import { CreateReviewModal } from '../../components/CreateReviewModal';

export interface Book {
	title: string;
	covers: number[];
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

	React.useEffect(() => {
		setIsLoading(true);
		const getBookInfo = async () => {
			const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
			const data = await res.json();

			setBook(data);
			setAuthor(router.query.author);
		};

		// const getAuthorInfo = async () => {
		// 	const res = await fetch(`${AUTHORS_URL}${book.authors.key}`);
		// 	const data = await res.json();
		// 	console.log(data);
		// };
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
	return (
		<>
			<main>
				{book && (
					<Card
						direction={['column', 'column', 'row']}
						overflow="hidden"
						variant="outline"
						w={'auto'}
					>
						<Center>
							<Image
								objectFit="contain"
								maxW={{ base: '100%', sm: '200px' }}
								src={`${BOOK_COVER_BASE_URL}${book.covers[0]}-L.jpg`}
								alt="Book Cover"
							/>
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
											{/* TODO: create new table for "saved" books (books to read later) */}
											<IconButton
												aria-label="Add to reading list"
												as={AiFillEye}
											/>
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
