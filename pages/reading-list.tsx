import {
	Box,
	Center,
	Heading,
	list,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BookWithDetails } from '../components/BookWithDetails';
import { useReadingList } from '../components/Context';
import { colors } from '../theme';

export default function ReadingList() {
	const { getReadingList, readingList, isLoading } = useReadingList();

	React.useEffect(() => {
		getReadingList();
	}, []);

	return (
		<Box>
			<Heading p={10} color={colors.white}>
				Reading List
			</Heading>
			<VStack spacing={5}>
				{isLoading ? (
					<Center>
						<Spinner size="xl" />
					</Center>
				) : (
					readingList.map((listItem, idx) => (
						<BookWithDetails
							imageSize="M"
							bookWorkKey={listItem.bookWorkKey}
							key={idx}
							author={listItem.author}
							book={{
								title: listItem.title,
								covers: [listItem.cover],
							}}
						/>
					))
				)}
			</VStack>
		</Box>
	);
}
