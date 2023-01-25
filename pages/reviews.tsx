import { Heading, Box, Center, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';
import { useReview } from '../components/Context';
import { ReviewCard } from '../components/ReviewCard';
import { colors } from '../theme';

export default function Reviews() {
	const { reviews, isLoading, getReviews } = useReview();

	React.useEffect(() => {
		getReviews();
	}, []);

	const ratedReviews = reviews.filter((review) => review.rating > 0);

	return (
		<Box>
			<Heading p={10} color={colors.white}>
				Your Reviews
			</Heading>
			<VStack>
				{
					// isLoading ? (
					// 	<Center>
					// 		<Spinner size="xl" />
					// 	</Center>
					// ) : (
					ratedReviews.map((review, idx) => (
						<ReviewCard key={idx} review={review} />
					))
					// )
				}
			</VStack>
		</Box>
	);
}
