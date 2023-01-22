import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useReadingList } from '../components/Context';

export default function ReadingList() {
	const { getReadingList, readingList, isLoading } = useReadingList();

	React.useEffect(() => {
		getReadingList();
	}, []);

	return (
		<Box>
			{readingList &&
				readingList.map((listItem, idx) => (
					<Box key={idx}>
						<Text>{listItem.author}</Text>
					</Box>
				))}
		</Box>
	);
}
