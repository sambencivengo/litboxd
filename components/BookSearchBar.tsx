import { HStack, Input, Select } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';

interface BookSearchBarProps {}

export const BookSearchBar: React.FC<BookSearchBarProps> = ({}) => {
	return (
		<HStack>
			<Select
				bgColor={colors.greyBlue}
				w="150px"
				borderRight={0}
				left={2}
				borderRightRadius={0}
			>
				<option>Title</option>
				<option>Author</option>
				<option>Text</option>
				<option>Subject</option>
			</Select>
			<Input borderLeftRadius={0} />
		</HStack>
	);
};
