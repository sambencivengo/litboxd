import {
	Card,
	Stack,
	CardBody,
	Heading,
	Image,
	Text,
	CardFooter,
} from '@chakra-ui/react';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { colors } from '../theme';
import { BookResult } from './BookSearchBar';

interface BookCardProps {
	book: BookResult;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
	const { author_name, cover_i, title } = book;
	return (
		<Card
			bgColor={colors.greyBlue}
			w={['300px', '400px']}
			key={cover_i}
			direction={{
				base: 'column',
				sm: 'row',
			}}
			overflow="hidden"
			variant="outline"
		>
			<Image
				alignSelf={'center'}
				objectFit="cover"
				maxW="200px"
				src={`${BOOK_COVER_BASE_URL}${cover_i}-M.jpg`}
				alt={`${title} Cover`}
			/>

			<Stack>
				<CardBody>
					<Heading size="md">{title}</Heading>

					<Text py="2">by {author_name}</Text>
				</CardBody>

				<CardFooter></CardFooter>
			</Stack>
		</Card>
	);
};
