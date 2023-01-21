import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { LIBRARY_SEARCH_URL } from '../constants';
import { colors } from '../theme';

type SearchBarCategoryProps = 'title' | 'subject' | 'author' | 'text';

interface BookSearchBarProps {
	setBookResults: React.Dispatch<React.SetStateAction<BookResult[]>>;
}

export interface BookResult {
	cover_i: string;
	author_name: string[];
	title: string;
}

export const BookSearchBar: React.FC<BookSearchBarProps> = ({
	setBookResults,
}) => {
	const [searchCategory, setSearchCategory] =
		React.useState<SearchBarCategoryProps>('title');
	const [searchBarInput, setSearchBarInput] = React.useState<string>('');
	const [isLoading, setIsLoading] = React.useState(false);

	const fetchBooks = async () => {
		setIsLoading(true);
		const res = await fetch(
			`${LIBRARY_SEARCH_URL}${searchCategory}=${searchBarInput
				.split(' ')
				.join('+')}`
		);
		const data = await res.json();

		setIsLoading(false);

		setBookResults(data.docs);
	};

	return (
		<Box ml={2}>
			<HStack>
				<Select
					onChange={(e) =>
						setSearchCategory(
							e.target.value as SearchBarCategoryProps
						)
					}
					color={colors.white}
					textAlign="center"
					bgColor={colors.greyBlue}
					w="200px"
					borderRight={0}
					borderRightRadius={0}
				>
					<option value="title">Title</option>
					<option value="author">Author</option>
					<option value="text">Text</option>
					<option value="subject">Subject</option>
				</Select>
				<InputGroup right={2}>
					<Input
						borderLeftRadius={0}
						onChange={(e) => setSearchBarInput(e.target.value)}
					/>
					<InputRightElement width="3rem">
						{isLoading ? (
							<Spinner />
						) : (
							<IconButton
								icon={<Search2Icon />}
								aria-label="Magnifying glass"
								h="1.75rem"
								onClick={!searchBarInput ? null : fetchBooks}
							/>
						)}
					</InputRightElement>
				</InputGroup>
			</HStack>
		</Box>
	);
};
