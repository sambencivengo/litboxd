import {
	Heading,
	Box,
	Center,
	Spinner,
	VStack,
	Divider,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useReview } from '../components/Context';
import { ReviewCard } from '../components/ReviewCard';
import { colors } from '../theme';

export default function Reviews() {
	const { reviews, isLoading, getReviews } = useReview();

	React.useEffect(() => {
		getReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ratedReviews = reviews.filter((review) => review.rating > 0);

	const renderSpinner = () => {
		if (isLoading) {
			return (
				<Center>
					<Spinner size="xl" />
				</Center>
			);
		}
	};

	return (
		<>
			<Head>
				<title>Litboxd | Reviews</title>

				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box>
				<Heading p={10} color={colors.white}>
					Your Reviews
				</Heading>
				<Divider />

				<VStack mt={5}>
					{renderSpinner()}
					{ratedReviews.length &&
						ratedReviews.map((review, idx) => (
							<ReviewCard key={idx} review={review} />
						))}
					{!isLoading && !ratedReviews.length && (
						<Center p={20}>
							<Heading color={colors.white} size={'md'}>
								You haven&apos;t reviewed any books yet...
							</Heading>
						</Center>
					)}
				</VStack>
			</Box>
		</>
	);
}
