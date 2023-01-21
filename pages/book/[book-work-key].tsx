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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { StarRatingButtonContainer } from '../../components/StarRating';
import { BOOK_COVER_BASE_URL, BOOK_URL } from '../../constants';

interface Book {
	title: string;
	covers: number[];
	subjects: string[];
	description?: {
		value: string;
	};
}

export default function BookWorkKey() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState<Book>(null);
	const [author, setAuthor] = React.useState<string | string[] | null>(null);
	const bookWorkKey = router.query['book-work-key'];

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
								{/* TODO: review and fetch request to create review */}
								<HStack>
									<StarRatingButtonContainer />
								</HStack>
							</CardFooter>
						</Stack>
					</Card>
				)}
			</main>
		</>
	);
}
