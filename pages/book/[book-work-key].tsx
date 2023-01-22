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
import { BookWithDetails } from '../../components/BookWithDetails';

export interface Book {
	title: string;
	covers?: number[];
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
					<BookWithDetails
						author={author}
						book={book}
						bookWorkKey={bookWorkKey}
					/>
				)}
			</main>
		</>
	);
}
