import { Search2Icon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	FormControl,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Select,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { LIBRARY_SEARCH_URL } from '../constants';
import { colors } from '../theme';

type SearchBarCategoryProps = 'title' | 'author';

interface BookSearchBarProps {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setBookResults: React.Dispatch<React.SetStateAction<BookResult[]>>;
}

export interface BookResult {
	key: string;
	cover_i: number;
	isbn: string[];
	author_name: string[];
	title: string;
}

export const BookSearchBar: React.FC<BookSearchBarProps> = ({
	setBookResults,
	setIsLoading,
}) => {
	const router = useRouter();

	const [searchCategory, setSearchCategory] =
		React.useState<SearchBarCategoryProps>('title');
	const [searchBarInput, setSearchBarInput] = React.useState<string>('');
	const searchQuery = `${LIBRARY_SEARCH_URL}${searchCategory}=${router.query.search}`;

	React.useEffect(() => {
		const fetchFromQuery = async () => {
			if (router.isReady) {
				if (!router.query.search) {
					return;
				}
				setIsLoading(true);
				const res = await fetch(searchQuery);
				const data = await res.json();
				// TODO: request error
				const reducedResults = data.docs.slice(0, 5);
				setBookResults(reducedResults);
				setIsLoading(false);
			}
		};
		fetchFromQuery();
	}, [
		setIsLoading,
		router.isReady,
		router.query,
		setBookResults,
		searchQuery,
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
					setIsLoading(true);
					router.push({
						query: {
							search: searchBarInput,
						},
					});
					const res = await fetch(
						`${LIBRARY_SEARCH_URL}${searchCategory}=${searchBarInput
							.split(' ')
							.join('+')}&limit=10`
					);
					const data = await res.json();

					const reducedResults = data.docs.slice(0, 10);
					setBookResults(reducedResults);
					setIsLoading(false);

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
									// _hover={{
									// 	borderColor: colors.greyBlue,
									// }}
									// borderColor={colors.greyBlue}
									// color={colors.white}
									// textAlign="center"
									// bgColor={colors.darkBlue}
									w="200px"
									borderRight={0}
									borderRightRadius={0}
								>
									<option value="title">Title</option>
									<option value="author">Author</option>
								</Select>
							</FormControl>
							<FormControl id="searchBarInput" w={'5000px'}>
								<InputGroup>
									<Input
										// borderColor={colors.greyBlue}
										// _hover={{
										// 	borderColor: colors.greyBlue,
										// }}
										// bgColor={colors.darkBlue}

										borderLeftRadius={0}
										onChange={(e) =>
											setSearchBarInput(e.target.value)
										}
									/>
									<InputRightElement width="3rem">
										<IconButton
											bgColor={colors.darkBlue}
											_hover={{
												backgroundColor:
													colors.greyBlue,
											}}
											// borderColor={colors.greyBlue}
											isLoading={isSubmitting}
											isDisabled={
												isSubmitting ||
												!searchBarInput.length
											}
											icon={<Search2Icon />}
											aria-label="Magnifying glass"
											h="1.75rem"
											type="submit"
										/>
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
