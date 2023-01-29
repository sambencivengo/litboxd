import { useToast } from '@chakra-ui/react';
import React from 'react';
import { ReadingList, User } from '../../src/entities';

interface ReadingListProviderProps {
	children: React.ReactNode;
}

interface RemoveFromReadingListArgs {
	bookWorkKey: string | string[];
}

interface AddToReadingListArgs extends RemoveFromReadingListArgs {
	author: string | string[];
	title: string;
	cover: number | null;
}
interface ReadingListContextData {
	isLoading: boolean;
	readingList: ReadingList[];
	getReadingList: () => Promise<void>;
	addToReadingList: (a: AddToReadingListArgs) => Promise<boolean>;
	removeFromReadingList: (a: RemoveFromReadingListArgs) => Promise<boolean>;
}
const ReadingListContext = React.createContext<ReadingListContextData>({
	isLoading: false,
	readingList: [],
	getReadingList: async () => {},
	addToReadingList: async () => false,
	removeFromReadingList: async () => false,
});

export const ReadingListProvider: React.FC<ReadingListProviderProps> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [readingList, setReadingList] = React.useState([]);
	const toast = useToast();

	const getReadingList = async () => {
		try {
			const res = await fetch('/api/readingList');
			const data = await res.json();

			setReadingList(data);
			setIsLoading(false);
		} catch (error) {
			setReadingList([]);
			console.error(error);
			setIsLoading(false);
		}
	};

	const addToReadingList = async ({
		bookWorkKey,
		cover,
		title,
		author,
	}: AddToReadingListArgs) => {
		const res = await fetch(`/api/readingList`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				bookWorkKey,
				author,
				cover,
				title,
			}),
			credentials: 'include',
		});

		if (!res.ok) {
			toast({
				title: 'Unable to add book from reading list',
				status: 'error',
				variant: 'solid',
				duration: 2000,
				isClosable: true,
				position: 'top',
			});
			return false;
		}
		await res.json();
		setIsLoading(false);
		return true;
	};

	const removeFromReadingList = async ({
		bookWorkKey,
	}: RemoveFromReadingListArgs): Promise<boolean> => {
		const res = await fetch(`/api/readingList?bookWorkKey=${bookWorkKey}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'include',
		});

		if (!res.ok) {
			toast({
				title: 'Unable to remove book to reading list',
				status: 'error',
				variant: 'solid',
				duration: 2000,
				isClosable: true,
				position: 'top',
			});
			return false;
		}

		await res.json();
		return true;
	};

	React.useEffect(() => {
		getReadingList();
	}, []);

	return (
		<ReadingListContext.Provider
			value={{
				addToReadingList,
				removeFromReadingList,
				isLoading,
				readingList,
				getReadingList,
			}}
		>
			{children}
		</ReadingListContext.Provider>
	);
};

export const useReadingList = () => React.useContext(ReadingListContext);
