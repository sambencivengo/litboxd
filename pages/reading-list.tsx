import { Box, Heading, list, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BookWithDetails } from '../components/BookWithDetails';
import { useReadingList } from '../components/Context';
import { colors } from '../theme';

export default function ReadingList() {
	const { getReadingList, readingList, isLoading } = useReadingList();

	React.useEffect(() => {
		getReadingList();
	}, []);

	console.log(readingList);

	return (
		<Box>
			<Heading p={10} color={colors.white}>
				Reading List
			</Heading>
			<VStack spacing={5}>
				{readingList &&
					readingList.map((listItem, idx) => (
						// <Box key={idx}>
						// 	<Text>{listItem.author}</Text>
						// </Box>
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
					))}
			</VStack>
		</Box>
	);
}
