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
	ratingValue: number;
	rateOrEditRating: (a: number) => void;
}

export const StarButton: React.FC<StarButtonProps> = ({
	setStarRatingPreview,
	rateOrEditRating,
	starRatingPreview,
	setStarRating,
	starRating,
	ratingValue,
}) => {
	const { reviews, editReview } = useReview();

	const highlightStars =
		starRating >= ratingValue || starRatingPreview >= ratingValue;

	return (
		<IconButton
			type="submit"
			onClick={async () => {
				rateOrEditRating(ratingValue);
				setStarRating(ratingValue);
				// TODO: use one controller for this
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
