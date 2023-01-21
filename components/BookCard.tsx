import {
	Card,
	Stack,
	CardBody,
	Heading,
	Image,
	Text,
	CardFooter,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { colors } from '../theme';
import { BookResult } from './BookSearchBar';

interface BookCardProps {
	book: BookResult;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
	const { author_name, cover_i, title, key, isbn } = book;
	const keyArray = key.split('/');
	const keySlug = `${keyArray[keyArray.length - 1]}`;

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
					<Link href={`/book/${keySlug}?cover=${cover_i}`}>
						<Heading size="md">{title}</Heading>
					</Link>

					<Text py="2">by {author_name}</Text>
				</CardBody>

				<CardFooter></CardFooter>
			</Stack>
		</Card>
	);
};
