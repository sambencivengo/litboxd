import { HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { ReadOnlyStarIcon } from './ReadOnlyStarIcon';

interface ReadOnlyRatingProps {
	ratingValue: number;
}

export const ReadOnlyRating: React.FC<ReadOnlyRatingProps> = ({
	ratingValue,
}) => {
	return (
		<HStack>
			{[...new Array(5)].map((_, idx) => (
				<ReadOnlyStarIcon
					key={idx}
					starNumber={(idx += 1)}
					ratingValue={ratingValue}
				/>
			))}
		</HStack>
	);
};
