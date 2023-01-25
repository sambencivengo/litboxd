import { Box } from '@chakra-ui/react';
import React from 'react';

interface ReviewContentProps {
	rating: number;
	reviewContent: string;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({
	rating,
	reviewContent,
}) => {
	return (
		<Box>
			{rating}
			{reviewContent}
		</Box>
	);
};
