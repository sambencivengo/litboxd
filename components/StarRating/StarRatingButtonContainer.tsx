import { ButtonGroup, CloseButton, HStack } from '@chakra-ui/react';
import React from 'react';
import { BookForDatabase } from '../../src/types';
import { useReview } from '../Context/ReviewProvider';
import { StarButton } from './StarButton';

interface StarRatingButtonContainerProps {
	book: BookForDatabase;
	// TODO: function for fetch
}

export const StarRatingButtonContainer: React.FC<
	StarRatingButtonContainerProps
> = ({ book }) => {
	const [starRating, setStarRating] = React.useState<number>(0);
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const { rateBook, reviews, editReview } = useReview();
	// TODO: figure out styling for half value ratings
	const existingReview = reviews.find(
		(review) => review.bookWorkKey === book.bookWorkKey
	);

	React.useEffect(() => {
		if (existingReview) {
			setStarRating(existingReview.rating);
		}
	}, [existingReview, setStarRating, reviews]);

	const rateOrEditRating = async (ratingValue: number) => {
		if (existingReview) {
			editReview({
				bookWorkKey: book.bookWorkKey as string,
				rating: ratingValue,
			});
		} else {
			rateBook({
				rating: ratingValue,
				bookWorkKey: book.bookWorkKey as string,
				author: book.author as string,
				cover: book.cover,
				title: book.title,
			});
		}
	};

	return (
		<HStack>
			<ButtonGroup spacing={0} dir="row">
				{[...new Array(5)].map((_, idx) => (
					<StarButton
						rateOrEditRating={rateOrEditRating}
						key={idx}
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
							bookWorkKey: book.bookWorkKey as string,
						});
					}}
				/>
			)}
		</HStack>
	);
};
