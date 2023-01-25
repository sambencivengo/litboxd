import {
	Card,
	Stack,
	CardBody,
	Flex,
	Image,
	Text,
	Heading,
	Divider,
	CardFooter,
} from '@chakra-ui/react';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { Review } from '../src/entities';
import { useReview } from './Context';
import { StarRatingButtonContainer } from './StarRating';

interface ReviewCardProps {
	review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
	const [starRating, setStarRating] = React.useState<number>(0);
	const { editReview, rateBook } = useReview();

	React.useEffect(() => {
		setStarRating(review.rating);
	}, []);

	const rateOrReviewBook = async ({
		ratingValue,
		reviewContent,
	}: {
		ratingValue: number;
		reviewContent?: string;
	}) => {
		console.log('In rate or review for Fetch');

		if (existingReview) {
			editReview({
				bookWorkKey: book.bookWorkKey as string,
				rating: ratingValue,
			});
		} else {
			rateBook({
				reviewContent,
				rating: ratingValue,
				bookWorkKey: book.bookWorkKey as string,
				author: book.author as string,
				cover: book.cover,
				title: book.title,
			});
		}
	};

	const coverImage = review.cover
		? `${BOOK_COVER_BASE_URL}${review.cover}-M.jpg`
		: '/no-cover.png';

	return (
		<Card
			width="70%"
			direction={{ base: 'column', sm: 'row' }}
			overflow="hidden"
			variant="outline"
		>
			<Image
				objectFit="contain"
				maxW="150px"
				src={coverImage}
				alt="Book cover"
			/>

			<Stack w={'100%'}>
				<CardBody>
					<Flex direction="column">
						<Stack gap={1}>
							<Heading size="md">{review.title}</Heading>
							{review.author && (
								<Heading size="sm">by {review.author}</Heading>
							)}
						</Stack>
						<Divider pt={2} />
						<Stack pt={2}>
							{review.reviewContent && (
								<>
									<Heading size="sm">Review:</Heading>
									<Text py="2">{review.reviewContent}</Text>
								</>
							)}
						</Stack>
					</Flex>
				</CardBody>

				<CardFooter>
					<StarRatingButtonContainer
						starRating={starRating}
						setStarRating={setStarRating}
						submitOnStarClick={true}
						book={{
							author: review.author,
							bookWorkKey: review.bookWorkKey,
							title: review.title,
							cover: review.cover,
						}}
					/>
				</CardFooter>
			</Stack>
		</Card>
	);
};
