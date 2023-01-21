import { IconButton } from '@chakra-ui/react';

import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { colors } from '../../theme';

interface StarButtonProps {
	setStarRating: React.Dispatch<React.SetStateAction<number>>;
	starRating: number;
	ratingValue: number;
}

export const StarButton: React.FC<StarButtonProps> = ({
	setStarRating,
	starRating,
	ratingValue,
}) => {
	return (
		<IconButton
			fontSize={40}
			aria-label="Star rating button"
			onMouseEnter={() => setStarRating(ratingValue)}
			onMouseLeave={() => setStarRating(0)}
			value={ratingValue}
			icon={
				ratingValue <= starRating ? <AiFillStar /> : <AiOutlineStar />
			}
			variant="ghost"
			color={ratingValue <= starRating ? colors.orange : colors.white}
			_hover={{
				color: `${colors.orange}`,
				backgroundColor: 'transparent',
			}}
		/>
	);
};
