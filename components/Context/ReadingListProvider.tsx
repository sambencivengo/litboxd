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
		setIsLoading(true);
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
