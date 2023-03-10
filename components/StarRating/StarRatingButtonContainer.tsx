import { ButtonGroup, CloseButton, HStack } from '@chakra-ui/react';
import React from 'react';
import { BookForDatabase } from '../../src/types';
import { colors } from '../../theme';
import { useReview } from '../Context';
import { StarButton } from './StarButton';

interface StarRatingButtonContainerProps {
	book: BookForDatabase;
	submitOnStarClick: boolean;
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	starRating: number;
}

export const StarRatingButtonContainer: React.FC<
	StarRatingButtonContainerProps
> = ({ book, submitOnStarClick, setStarRating, starRating }) => {
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const { editReview } = useReview();

	return (
		<HStack>
			<ButtonGroup spacing={0} dir="row">
				{[...new Array(5)].map((_, idx) => (
					<StarButton
						submitOnStarClick={submitOnStarClick}
						key={idx}
						book={book}
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
					color={colors.white}
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
