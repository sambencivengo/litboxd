import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { colors } from '../../theme';

interface StarButtonProps {
	setStarRatingPreview: React.Dispatch<React.SetStateAction<number>>;
	starRatingPreview: number;
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	rateOrReviewBook: (a: {
		ratingValue: number;
		reviewContent?: string;
	}) => Promise<void>;
	starRating: number;
	ratingValue: number;
	submitOnStarClick: boolean;
}

export const StarButton: React.FC<StarButtonProps> = ({
	setStarRatingPreview,
	starRatingPreview,
	setStarRating,
	starRating,
	ratingValue,
	rateOrReviewBook,
	submitOnStarClick,
}) => {
	const highlightStars =
		starRating >= ratingValue || starRatingPreview >= ratingValue;

	return (
		<IconButton
			type={submitOnStarClick ? 'submit' : 'button'}
			onClick={async () => {
				if (submitOnStarClick) {
					rateOrReviewBook({ ratingValue });
					setStarRating(ratingValue);
				} else {
					setStarRating(ratingValue);
				}
				// TODO: use one controller for this?
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
