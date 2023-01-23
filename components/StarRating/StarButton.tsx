import { IconButton } from '@chakra-ui/react';

import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { colors } from '../../theme';

interface StarButtonProps {
	setStarRatingPreview: React.Dispatch<React.SetStateAction<number>>;
	starRatingPreview: number;
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	starRating: number;
	rateBook: (a: number) => Promise<void>;
	ratingValue: number;
}

export const StarButton: React.FC<StarButtonProps> = ({
	setStarRatingPreview,
	starRatingPreview,
	setStarRating,
	starRating,
	rateBook,
	ratingValue,
}) => {
	const highlightStars =
		starRating >= ratingValue || starRatingPreview >= ratingValue;

	return (
		<IconButton
			type="submit"
			onClick={async () => {
				setStarRating(ratingValue);
				rateBook(ratingValue);
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
