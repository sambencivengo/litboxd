import { IconButton } from '@chakra-ui/react';

import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { colors } from '../../theme';
import { RateBookArgs, useReview } from '../Context/ReviewProvider';

interface StarButtonProps {
	setStarRatingPreview: React.Dispatch<React.SetStateAction<number>>;
	starRatingPreview: number;
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	starRating: number;
	rateBook: (a: RateBookArgs) => Promise<void>;
	ratingValue: number;
	author: string | string[];
	bookWorkKey: string | string[];
}

export const StarButton: React.FC<StarButtonProps> = ({
	setStarRatingPreview,
	starRatingPreview,
	setStarRating,
	starRating,
	rateBook,
	ratingValue,
	author,
	bookWorkKey,
}) => {
	const { reviews, editReview } = useReview();

	const reviewExists = reviews.find(
		(review) => review.bookWorkKey === bookWorkKey
	);

	const highlightStars =
		starRating >= ratingValue || starRatingPreview >= ratingValue;

	return (
		<IconButton
			type="submit"
			onClick={async () => {
				setStarRating(ratingValue);
				// TODO: use one controller for this
				if (reviewExists) {
					editReview({
						bookWorkKey: bookWorkKey as string,
						rating: ratingValue,
					});
				} else {
					rateBook({
						rating: ratingValue,
						bookWorkKey: bookWorkKey as string,
						author: author as string,
					});
				}
			}}
			fontSize={40}
			aria-label="Star rating button"
			onMouseEnter={() => setStarRatingPreview(ratingValue)}
			onMouseLeave={() => setStarRatingPreview(0)}
			value={ratingValue}
			icon={highlightStars ? <AiFillStar /> : <AiOutlineStar />}
			variant="ghost"
			color={highlightStars ? colors.orange : colors.white}
			_hover={{
				color: `${colors.orange}`,
				backgroundColor: 'transparent',
			}}
		/>
	);
};
