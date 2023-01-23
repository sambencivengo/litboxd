import { ButtonGroup, CloseButton, HStack } from '@chakra-ui/react';

import React from 'react';
import { CreateBookReview } from '../../src/schema';
import { StarButton } from './StarButton';

interface StarRatingButtonContainerProps {
	author: string | string[];
	bookWorkKey: string | string[];
}

export const StarRatingButtonContainer: React.FC<
	StarRatingButtonContainerProps
> = ({ author, bookWorkKey }) => {
	const [starRatingPreview, setStarRatingPreview] = React.useState<number>(0);
	const [starRating, setStarRating] = React.useState<number>(0);

	// TODO: figure out styling for half value ratings

	const rateBook = async (rating: number) => {
		CreateBookReview.uiSchema
			.validate({ rating, bookAuthor: author, bookWorkKey })
			.catch((error) => console.log(error));

		try {
			const res = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'content-type': 'application-json',
				},
				body: JSON.stringify({
					rating,
					bookAuthor: author,
					bookWorkKey,
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
