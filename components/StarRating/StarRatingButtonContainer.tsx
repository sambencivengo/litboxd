import {
	ButtonGroup,
	CloseButton,
	FormControl,
	HStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { CreateBookReview } from '../../src/schema';
import { StarButton } from './StarButton';

export const StarRatingButtonContainer: React.FC = () => {
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const [starRating, setStarRating] = React.useState<number>(0);

	// TODO: figure out styling for half value ratings

	const rateBook = async (rating: number) => {
		console.log(rating);
		try {
			const res = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'content-type': 'application-json',
				},
				body: JSON.stringify({
					rating,
				}),
			});
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<HStack>
			<ButtonGroup spacing={0} dir="row">
				{[...new Array(5)].map((_, idx) => (
					<StarButton
						key={idx}
						rateBook={rateBook}
						ratingValue={(idx += 1)}
						setStarRatingPreview={setStarRatingPreview}
						starRatingPreview={starRatingPreview}
						setStarRating={setStarRating}
						starRating={starRating}
					/>
				))}
			</ButtonGroup>
			{starRating && (
				<CloseButton
					onClick={() => {
						setStarRating(0);
					}}
				/>
			)}
		</HStack>
	);
};
