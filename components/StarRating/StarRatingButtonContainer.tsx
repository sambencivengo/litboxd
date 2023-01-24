import { ButtonGroup, CloseButton, HStack } from '@chakra-ui/react';
import React from 'react';
import { useReview } from '../Context/ReviewProvider';
import { StarButton } from './StarButton';

interface StarRatingButtonContainerProps {
	author: string | string[];
	bookWorkKey: string | string[];
	cover: number | undefined;
	title: string;
}

export const StarRatingButtonContainer: React.FC<
	StarRatingButtonContainerProps
> = ({ author, title, cover, bookWorkKey }) => {
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const [starRating, setStarRating] = React.useState<number>(0);
	const { rateBook, reviews, editReview } = useReview();
	// TODO: figure out styling for half value ratings
	const existingReview = reviews.find(
		(review) => review.bookWorkKey === bookWorkKey
	);
	React.useEffect(() => {
		if (existingReview) {
			setStarRating(existingReview.rating);
		}
	}, [bookWorkKey, existingReview, reviews]);

	const rateOrEditRating = async (ratingValue: number) => {
		if (existingReview) {
			editReview({
				bookWorkKey: bookWorkKey as string,
				rating: ratingValue,
			});
		} else {
			rateBook({
				rating: ratingValue,
				bookWorkKey: bookWorkKey as string,
				author: author as string,
				cover: cover,
				title,
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
							bookWorkKey: bookWorkKey as string,
						});
					}}
				/>
			)}
		</HStack>
	);
};
