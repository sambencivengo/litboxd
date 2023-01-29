import Head from 'next/head';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Image,
	Center,
	Divider,
	Heading,
	Text,
	Spinner,
	Stack,
	VStack,
	Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { BookResult, BookSearchBar } from '../components/BookSearchBar';
import { BookCardSearchResult } from '../components/BookCardSearchResult';
import { SplashPageInfo } from '../components/SplashPageInfo';
import { bookData } from '../data';
import { BOOK_COVER_BASE_URL } from '../constants';
import { useRouter } from 'next/router';
import { ExampleBooks } from '../components/ExampleBooks';

export default function Home() {
	const [bookResults, setBookResults] = React.useState<BookResult[]>();
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<>
			<Head>
				<title>Litboxd</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Box>
					<Box pb={10} px={20}>
						<BookSearchBar
							setIsLoading={setIsLoading}
							setBookResults={setBookResults}
						/>
					</Box>
					<Heading size={'md'} color={colors.white}>
						A social platform for sharing your taste in literature
						and books.
					</Heading>
					<Divider mt={5} />

					{!bookResults && (
						<>
							<SplashPageInfo />
							<Divider mb={5} />

							<Heading mb={5} size={'md'} color={colors.white}>
								What people are reading...
							</Heading>
							<Wrap justify={'center'}>
								{bookData.map((book, idx) => (
									<ExampleBooks book={book} key={idx} />
								))}
							</Wrap>
						</>
					)}
					{isLoading ? (
						<Center mt={100}>
							<Spinner size="xl" />
						</Center>
					) : (
						<VStack mt={10}>
							{bookResults &&
								bookResults.map((book) => {
									if (book.cover_i && book.author_name) {
										return (
											<BookCardSearchResult
												book={book}
												key={book.key}
											/>
										);
									}
								})}
						</VStack>
					)}
				</Box>
			</main>
		</>
	);
}
