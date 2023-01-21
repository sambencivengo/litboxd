import { StarIcon } from '@chakra-ui/icons';
import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { colors } from '../theme';

interface StarRatingButtonsProps {}

export const StarRatingButtons: React.FC<StarRatingButtonsProps> = ({}) => {
	const [starRating, setStarRating] = React.useState<number>(0);

	// 5 stars total
	// if you enter a start with the mouse, all stars to it's left must be filled
	// how to determine which stars with one state value
	// number state?
	// Each star is a number value, if it's value is greater or equal to the state, change icon to filled in

	return (
		<ButtonGroup spacing={'0'}>
			<IconButton
				fontSize={40}
				aria-label="Star rating button"
				onMouseEnter={() => setStarRating(1)}
				onMouseLeave={() => setStarRating(0)}
				value={1}
				icon={1 <= starRating ? <AiFillStar /> : <AiOutlineStar />}
				color={1 <= starRating ? colors.orange : colors.white}
				variant="ghost"
				_hover={{
					color: `${colors.orange}`,
					backgroundColor: 'transparent',
				}}
			/>
			<IconButton
				fontSize={40}
				aria-label="Star rating button"
				onMouseEnter={() => setStarRating(2)}
				onMouseLeave={() => setStarRating(0)}
				value={2}
				icon={2 <= starRating ? <AiFillStar /> : <AiOutlineStar />}
				color={2 <= starRating ? colors.orange : colors.white}
				variant="ghost"
				_hover={{
					color: `${colors.orange}`,
					backgroundColor: 'transparent',
				}}
			/>
			<IconButton
				fontSize={40}
				aria-label="Star rating button"
				onMouseEnter={() => setStarRating(3)}
				onMouseLeave={() => setStarRating(0)}
				value={3}
				icon={3 <= starRating ? <AiFillStar /> : <AiOutlineStar />}
				color={3 <= starRating ? colors.orange : colors.white}
				variant="ghost"
				_hover={{
					color: `${colors.orange}`,
					backgroundColor: 'transparent',
				}}
			/>
			<IconButton
				fontSize={40}
				aria-label="Star rating button"
				onMouseEnter={() => setStarRating(4)}
				onMouseLeave={() => setStarRating(0)}
				value={4}
				icon={4 <= starRating ? <AiFillStar /> : <AiOutlineStar />}
				variant="ghost"
				color={4 <= starRating ? colors.orange : colors.white}
				_hover={{
					color: `${colors.orange}`,
					backgroundColor: 'transparent',
				}}
			/>
			<IconButton
				fontSize={40}
				aria-label="Star rating button"
				onMouseEnter={() => setStarRating(5)}
				onMouseLeave={() => setStarRating(0)}
				value={5}
				icon={5 <= starRating ? <AiFillStar /> : <AiOutlineStar />}
				variant="ghost"
				color={5 <= starRating ? colors.orange : colors.white}
				_hover={{
					color: `${colors.orange}`,
					backgroundColor: 'transparent',
				}}
			/>
		</ButtonGroup>
	);
};
