import { ButtonGroup, CloseButton, HStack } from '@chakra-ui/react';

import React from 'react';
import { CreateBookReview } from '../../src/schema';
import { useReview } from '../Context/ReviewProvider';
import { StarButton } from './StarButton';

interface StarRatingButtonContainerProps {
	author: string | string[];
	bookWorkKey: string | string[];
	cover: number;
	title: string;
}

export const StarRatingButtonContainer: React.FC<
	StarRatingButtonContainerProps
> = ({ author, title, cover, bookWorkKey }) => {
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const [starRating, setStarRating] = React.useState<number>(0);
	const { rateBook, reviews, editReview } = useReview();
	// TODO: figure out styling for half value ratings

	React.useEffect(() => {
		const review = reviews.find(
			(review) => review.bookWorkKey === bookWorkKey
		);
		if (review) {
			setStarRating(review.rating);
		}
	}, [bookWorkKey, reviews]);
	return (
		<HStack>
			<ButtonGroup spacing={0} dir="row">
				{[...new Array(5)].map((_, idx) => (
					<StarButton
						cover={cover}
						title={title}
						author={author}
						bookWorkKey={bookWorkKey}
						key={idx}
						rateBook={rateBook}
						ratingValue={(idx += 1)}
						setStarRatingPreview={setStarRatingPreview}
						starRatingPreview={starRatingPreview}
						setStarRating={setStarRating}
						starRating={starRating}
					/>
				))}
			</ButtonGroup>
			{starRating && (
				<CloseButton
					onClick={() => {
						setStarRating(0);
						editReview({
							rating: 0,
							bookWorkKey: bookWorkKey as string,
						});
					}}
				/>
			)}
		</HStack>
	);
};
