import { StarIcon } from '@chakra-ui/icons';
import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { colors } from '../../theme';
import { StarButton } from './StarButton';

export const StarRatingButtonContainer: React.FC = () => {
	const [starRating, setStarRating] = React.useState<number>(0);

	// 5 stars total
	// if you enter a start with the mouse, all stars to it's left must be filled
	// how to determine which stars with one state value
	// number state?
	// Each star is a number value, if it's value is greater or equal to the state, change icon to filled in

	return (
		<ButtonGroup spacing={'0'}>
			<StarButton
				ratingValue={1}
				setStarRating={setStarRating}
				starRating={starRating}
			/>
			<StarButton
				ratingValue={2}
				setStarRating={setStarRating}
				starRating={starRating}
			/>
			<StarButton
				ratingValue={3}
				setStarRating={setStarRating}
				starRating={starRating}
			/>
			<StarButton
				ratingValue={4}
				setStarRating={setStarRating}
				starRating={starRating}
			/>
			<StarButton
				ratingValue={5}
				setStarRating={setStarRating}
				starRating={starRating}
			/>
		</ButtonGroup>
	);
};
