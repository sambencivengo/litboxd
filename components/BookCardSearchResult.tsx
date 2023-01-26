import {
	Card,
	Stack,
	CardBody,
	Heading,
	Image,
	Text,
	CardFooter,
	Button,
	Center,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BOOK_COVER_BASE_URL } from '../constants';
import { colors } from '../theme';
import { BookResult } from './BookSearchBar';
import { useReadingList, useUser } from './Context';

interface BookCardSearchResultProps {
	book: BookResult;
}

export const BookCardSearchResult: React.FC<BookCardSearchResultProps> = ({
	book,
}) => {
	const { author_name, cover_i, title, key } = book;
	const { user } = useUser();
	const keyArray = key.split('/');
	const keySlug = `${keyArray[keyArray.length - 1]}`;
	const { readingList, addToReadingList, removeFromReadingList } =
		useReadingList();
	const router = useRouter();
	const bookIsOnList = readingList.find(
		(readingListBook) => readingListBook.bookWorkKey === book.key // Result from search will have the work key labelled as "key"
	);
	return (
		<Card
			w="70%"
			direction={['column', 'column', 'row']}
			overflow="hidden"
			bgColor={colors.darkBlue}
			variant="outline"
		>
			<Image
				cursor={'pointer'}
				onClick={() =>
					router.push(`/book/${keySlug}?author=${author_name[0]}`)
				}
				alignSelf={'center'}
				objectFit="cover"
				maxW="200px"
				src={`${BOOK_COVER_BASE_URL}${cover_i}-M.jpg`}
				fallbackSrc="https://via.placeholder.com/150"
				alt={`${title} Cover`}
			/>

			<Stack>
				<CardBody>
					<Link href={`/book/${keySlug}?author=${author_name[0]}`}>
						<Heading color={colors.white} size="md">
							{title}
						</Heading>
					</Link>

					{author_name && (
						<Text color={colors.white} py="2">
							by {author_name[0]}
						</Text>
					)}
				</CardBody>

				<Center>
					<CardFooter>
						{user && (
							<Button
								leftIcon={<AiFillEye fontSize={30} />}
								color={bookIsOnList ? colors.green : null}
								onClick={() =>
									bookIsOnList
										? removeFromReadingList({
												bookWorkKey: book.key,
										  })
										: addToReadingList({
												author: book.author_name[0],
												bookWorkKey: book.key,
												cover: book.cover_i,
												title: book.title,
										  })
								}
							>
								{bookIsOnList ? 'Remove' : 'Read'}
							</Button>
						)}
					</CardFooter>
				</Center>
			</Stack>
		</Card>
	);
};
