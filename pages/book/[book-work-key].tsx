import {
	Box,
	Button,
	Card,
	CardBody,
	Text,
	CardFooter,
	CardHeader,
	Center,
	Heading,
	Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BOOK_URL } from '../../constants';
import { BookWithDetails } from '../../components/BookWithDetails';
import { BookForDatabase } from '../../src/types';
import { Review } from '../../src/entities';
import { ReadOnlyRating } from '../../components/StarRating';

interface ReviewWithUser extends Review {
	username: string;
	userId: number;
}

export default function BookWorkKey() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState<BookForDatabase>(null);
	const [reviews, setReviews] = React.useState<ReviewWithUser[]>([]);
	const bookWorkKey = router.query['book-work-key'];

	React.useEffect(() => {
		setIsLoading(true);
		const getBookInfo = async () => {
			// NOTE: if the book exists in a review or on the reading list,
			// these properties will come from the DB, in this file,
			// they are populated by the API and query parameters.

			// We will take the data from the API and only keep what we will need
			// in the DB, now typing across the app will be simple and consistent,
			// regardless of its origin (DB, API)
			const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
			const data = await res.json();

			setBook({
				cover: data.covers ? data.covers[0] : undefined,
				bookWorkKey,
				author: router.query.author,
				title: data.title,
			});
			getBookReviewsForBook();
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

	const getBookReviewsForBook = async () => {
		const bookReviews = await fetch(`/api/reviews/${bookWorkKey}`);
		const data = await bookReviews.json();
		setReviews(data);
		console.log(data);
	};

	return (
		<>
			<main>
				<Center>
					{book && <BookWithDetails book={book} imageSize="L" />}
				</Center>
				{reviews ? (
					<Box>
						{reviews.map((review, idx) => {
							return (
								<Card key={idx}>
									<CardHeader>
										<Heading size="md">Heading</Heading>
									</CardHeader>
									<CardBody>
										<Text>{review.reviewContent}</Text>
									</CardBody>
									<CardFooter>
										<ReadOnlyRating
											ratingValue={review.rating}
										/>
									</CardFooter>
								</Card>
							);
						})}
					</Box>
				) : (
					<Box>
						There are no reviews for this book yet, sign up and be
						the first!
					</Box>
				)}
			</main>
		</>
	);
}
