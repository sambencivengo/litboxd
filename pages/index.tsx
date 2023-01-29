import Head from 'next/head';
import {
	Box,
	Center,
	Divider,
	Heading,
	Spinner,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { BookResult, BookSearchBar } from '../components/BookSearchBar';
import { BookCardSearchResult } from '../components/BookCardSearchResult';
import { SplashPageInfo } from '../components/SplashPageInfo';

export default function Home() {
	const [bookResults, setBookResults] = React.useState<BookResult[]>();
	const [isLoading, setIsLoading] = React.useState(false);

	return (
		<>
			<Head>
				<title>Litboxd</title>
				{/* <meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/> */}
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
					<Divider />

					{!bookResults && <SplashPageInfo />}
					<Divider />
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
