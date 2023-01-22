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
}
interface ReadingListContextData {
	isLoading: boolean;
	readingList: ReadingList[];
	getReadingList: () => Promise<void>;
	addToReadingList: (a: AddToReadingListArgs) => Promise<void>;
	removeFromReadingList: (a: RemoveFromReadingListArgs) => Promise<void>;
}
const ReadingListContext = React.createContext<ReadingListContextData>({
	isLoading: false,
	readingList: [],
	getReadingList: async () => {},
	addToReadingList: async () => {},
	removeFromReadingList: async () => {},
});

export const ReadingListProvider: React.FC<ReadingListProviderProps> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [readingList, setReadingList] = React.useState([]);

	const getReadingList = async () => {
		try {
			const res = await fetch('/api/readingList');
			const data = await res.json();
			setReadingList(data);
		} catch (error) {
			setReadingList([]);
			console.error(error);
		}
	};

	const addToReadingList = async ({
		bookWorkKey,
		author,
	}: AddToReadingListArgs) => {
		const res = await fetch(`/api/readingList`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				bookKey: bookWorkKey,
				author,
			}),
			credentials: 'include',
		});

		getReadingList();
		await res.json();
	};

	const removeFromReadingList = async ({
		bookWorkKey,
	}: RemoveFromReadingListArgs) => {
		const res = await fetch(`/api/readingList?bookWorkKey=${bookWorkKey}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'include',
		});
		getReadingList();
		await res.json();
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
