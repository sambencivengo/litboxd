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
	const [bookIsOnList, setBookIsOnList] = React.useState(false);
	const { author_name, cover_i, title, key } = book;
	const { user } = useUser();
	const keyArray = key.split('/');
	const keySlug = `${keyArray[keyArray.length - 1]}`;
	const { readingList, addToReadingList, removeFromReadingList } =
		useReadingList();
	const router = useRouter();
	const [_, bookWorkKey] = book.key.split('/works/');

	React.useEffect(() => {
		if (
			readingList.find(
				(readingListBook) => readingListBook.bookWorkKey === bookWorkKey // Result from search will have the work key labelled as "key"
			)
		) {
			setBookIsOnList(true);
		}
	}, [book, bookWorkKey, readingList]);

	const handleOptimisticFetch = async (action: 'add' | 'remove') => {
		let success: boolean;
		action === 'remove'
			? (success = await removeFromReadingList({
					bookWorkKey,
			  }))
			: (success = await addToReadingList({
					author: book.author_name[0],
					bookWorkKey,
					cover: book.cover_i,
					title: book.title,
			  }));

		if (!success) {
			setBookIsOnList(action === 'remove' ? true : false);
		}
	};

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

			<Stack w={'100%'}>
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

				<CardFooter>
					<Center>
						{user && (
							<Button
								leftIcon={<AiFillEye fontSize={30} />}
								color={bookIsOnList ? colors.green : null}
								onClick={() => {
									setBookIsOnList(!bookIsOnList);

									handleOptimisticFetch(
										bookIsOnList ? 'remove' : 'add'
									);
								}}
							>
								{bookIsOnList ? 'Remove' : 'Read'}
							</Button>
						)}
					</Center>
				</CardFooter>
			</Stack>
		</Card>
	);
};
