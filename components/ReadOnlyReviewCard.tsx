import {
	Card,
	CardHeader,
	Text,
	Heading,
	CardBody,
	CardFooter,
	HStack,
} from '@chakra-ui/react';
import React from 'react';
import { ReviewWithUser } from '../pages/book/[book-work-key]';
import { colors } from '../theme';
import { ReadOnlyRating } from './StarRating';

interface ReadOnlyReviewCardProps {
	review: ReviewWithUser;
}

export const ReadOnlyReviewCard: React.FC<ReadOnlyReviewCardProps> = ({
	review,
}) => {
	return (
		<Card variant={'outline'} bgColor={colors.darkBlue} w={'290px'}>
			<CardHeader>
				<Heading color={colors.white} size="sm">
					@{review.user.username}
				</Heading>
			</CardHeader>
			<CardBody>
				<Text color={colors.white}>{review.reviewContent}</Text>
			</CardBody>
			<CardFooter>
				<HStack>
					<ReadOnlyRating ratingValue={review.rating} />
				</HStack>
			</CardFooter>
		</Card>
	);
};
