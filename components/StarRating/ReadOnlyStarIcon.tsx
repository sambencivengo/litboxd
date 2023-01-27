import { Icon } from '@chakra-ui/icons';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { boolean } from 'yup';
import { colors } from '../../theme';

interface ReadOnlyStarIconProps {
	ratingValue: number;
	starNumber: number;
}

export const ReadOnlyStarIcon: React.FC<ReadOnlyStarIconProps> = ({
	ratingValue,
	starNumber,
}) => {
	const highlightStar = starNumber <= ratingValue;

	return (
		<Icon fontSize={25}>
			{highlightStar ? (
				<AiFillStar color={colors.orange} />
			) : (
				<AiOutlineStar color={colors.white} />
			)}
		</Icon>
	);
};
