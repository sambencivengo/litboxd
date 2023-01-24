import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	FormControl,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Spinner,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { LIBRARY_SEARCH_URL } from '../constants';
import { colors } from '../theme';

type SearchBarCategoryProps = 'title' | 'subject' | 'author' | 'text';

interface BookSearchBarProps {
	setBookResults: React.Dispatch<React.SetStateAction<BookResult[]>>;
}

export interface BookResult {
	key: string;
	cover_i?: number;
	isbn: string[];
	author_name: string[];
	title: string;
}

export const BookSearchBar: React.FC<BookSearchBarProps> = ({
	setBookResults,
}) => {
	const router = useRouter();

	const [searchCategory, setSearchCategory] =
		React.useState<SearchBarCategoryProps>('title');
	const [searchBarInput, setSearchBarInput] = React.useState<string>('');
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		const fetchFromQuery = async () => {
			if (router.isReady) {
				if (!router.query.search) {
					return;
				}
				const res = await fetch(
					`${LIBRARY_SEARCH_URL}${searchCategory}=${router.query.search}`
				);
				const data = await res.json();
				const reducedResults = data.docs.slice(0, 5);
				setBookResults(reducedResults);
			}
		};
		fetchFromQuery();
	}, [
		router.isReady,
		router.query,
		searchCategory,
		searchBarInput,
		setBookResults,
	]);

	return (
		<Box ml={2}>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{
					searchBarInput: '',
					searchCategory: 'title',
				}}
				onSubmit={async () => {
					router.push({
						query: {
							search: searchBarInput,
						},
					});
					const res = await fetch(
						`${LIBRARY_SEARCH_URL}${searchCategory}=${searchBarInput
							.split(' ')
							.join('+')}&limit=5`
					);
					const data = await res.json();

					setIsLoading(false);
					const reducedResults = data.docs.slice(0, 5);
					setBookResults(reducedResults);

					// NOTE: removed extra fetch, maybe come back to it? Otherwise, control for lack of cover image on click
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Flex dir="row" justifyContent="center">
							<FormControl id="searchCategory">
								<Select
									onChange={(e) =>
										setSearchCategory(
											e.target
												.value as SearchBarCategoryProps
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
							</FormControl>
							<FormControl id="searchBarInput" w={'5000px'}>
								<InputGroup>
									<Input
										borderLeftRadius={0}
										onChange={(e) =>
											setSearchBarInput(e.target.value)
										}
									/>
									<InputRightElement width="3rem">
										{isLoading ? (
											<Spinner />
										) : (
											<IconButton
												isLoading={isSubmitting}
												isDisabled={isSubmitting}
												icon={<Search2Icon />}
												aria-label="Magnifying glass"
												h="1.75rem"
												type="submit"
											/>
										)}
									</InputRightElement>
								</InputGroup>
							</FormControl>
						</Flex>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
