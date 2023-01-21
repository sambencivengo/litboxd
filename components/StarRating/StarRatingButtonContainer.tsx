import { ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { StarButton } from './StarButton';

export const StarRatingButtonContainer: React.FC = () => {
	const [starRating, setStarRating] = React.useState<number>(0);

	// 5 stars total
	// if you enter a start with the mouse, all stars to it's left must be filled
	// how to determine which stars with one state value
	// number state?
	// Each star is a number value, if it's value is greater or equal to the state, change icon to filled in

	// TODO: state for preview of value: hover/highlight
	// TODO: state for chosen(clicked) value: highlight
	return (
		<ButtonGroup spacing={'0'}>
			{[...new Array(5)].map((_, idx) => (
				<StarButton
					key={idx}
					ratingValue={(idx += 1)}
					setStarRating={setStarRating}
					starRating={starRating}
				/>
			))}
		</ButtonGroup>
	);
};
