import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BookForDatabase } from '../../src/types';
import { colors } from '../../theme';
import { useReview } from '../Context';

interface StarButtonProps {
	setStarRatingPreview: React.Dispatch<React.SetStateAction<number>>;
	starRatingPreview: number;
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	book: BookForDatabase;
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
	book,
	submitOnStarClick,
}) => {
	const { rateBook } = useReview();
	const highlightStars =
		starRating >= ratingValue || starRatingPreview >= ratingValue;

	return (
		<IconButton
			type={submitOnStarClick ? 'submit' : 'button'}
			onClick={async () => {
				if (submitOnStarClick) {
					rateBook({
						rating: ratingValue,
						bookWorkKey: book.bookWorkKey as string,
						author: book.author as string,
						cover: book.cover,
						title: book.title,
					});
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
