import {
	Box,
	Center,
	Divider,
	Heading,
	Spinner,
	VStack,
} from '@chakra-ui/react';
import { faker } from '@mikro-orm/seeder';

import Head from 'next/head';
import React from 'react';
import { BookWithDetails } from '../components/BookWithDetails';
import { useReadingList } from '../components/Context';
import { colors } from '../theme';

export default function ReadingList() {
	const { getReadingList, readingList, isLoading } = useReadingList();

	React.useEffect(() => {
		getReadingList();
	}, []);

	const renderSpinner = () => {
		if (isLoading) {
			return (
				<Center>
					<Spinner size="xl" />
				</Center>
			);
		}
	};

	return (
		<>
			<Head>
				<title>Litboxd | Reading List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box>
				<Heading p={10} color={colors.white}>
					Reading List
				</Heading>
				<Divider />

				<VStack mt={5} spacing={5}>
					{renderSpinner()}
					{readingList &&
						readingList.map((book, idx) => (
							<BookWithDetails
								imageSize="M"
								key={idx}
								book={{
									author: book.author,
									bookWorkKey: book.bookWorkKey,
									title: book.title,
									cover: book.cover,
								}}
							/>
						))}

					{!isLoading && !readingList.length && (
						<Center p={20}>
							<Heading color={colors.white} size={'md'}>
								Looks like you don&apos;t have any books on your
								reading list...
							</Heading>
						</Center>
					)}
				</VStack>
			</Box>
		</>
	);
}
