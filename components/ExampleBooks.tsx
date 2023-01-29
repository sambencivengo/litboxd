import {
	Card,
	CardBody,
	Center,
	Image,
	Stack,
	Heading,
	Divider,
} from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { BOOK_COVER_BASE_URL } from '../constants';
import { BookForDatabase } from '../src/types';
import { colors } from '../theme';

interface ExampleBooksProps {
	book: BookForDatabase;
}

export const ExampleBooks: React.FC<ExampleBooksProps> = ({ book }) => {
	return (
		<Card
			onClick={() =>
				router.push(`/book/${book.bookWorkKey}?author=${book.author}`)
			}
			cursor={'pointer'}
			_hover={{
				borderColor: colors.greyBlue,
			}}
			bgColor={colors.darkBlue}
			variant="outline"
			w="280px"
		>
			<CardBody>
				<Center>
					<Image
						src={
							book.cover
								? `${BOOK_COVER_BASE_URL}${book.cover}-L.jpg`
								: 'https://via.placeholder.com/150'
						}
						alt="Book Cover"
						fallbackSrc="https://via.placeholder.com/150"
						borderRadius="lg"
						h={'300px'}
					/>
				</Center>
				<Stack mt="6" spacing="3">
					<Stack gap={1}>
						<Heading color={colors.white} size="md">
							{book.title}
						</Heading>
						{book.author && (
							<Heading color={colors.white} size="sm">
								by {book.author}
							</Heading>
						)}
					</Stack>
				</Stack>
			</CardBody>
			<Divider />
		</Card>
	);
};
