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

	React.useEffect(() => {
		setStarRating(review.rating);
	}, [review]);

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
				src={`${BOOK_COVER_BASE_URL}${review.cover}-M.jpg`}
				alt="Book cover"
				fallbackSrc="https://via.placeholder.com/150"
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
