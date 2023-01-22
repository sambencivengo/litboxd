import React from 'react';
import { ReadingList, User } from '../../src/entities';

interface ReadingListProviderProps {
	children: React.ReactNode;
}

interface ReadingListContextData {
	isLoading: boolean;
	readingList: ReadingList[];
	getReadingList: () => Promise<void>;
}
const ReadingListContext = React.createContext<ReadingListContextData>({
	isLoading: false,
	readingList: [],
	getReadingList: async () => {},
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

	React.useEffect(() => {
		getReadingList();
	}, []);

	return (
		<ReadingListContext.Provider
			value={{ isLoading, readingList, getReadingList }}
		>
			{children}
		</ReadingListContext.Provider>
	);
};

export const useReadingList = () => React.useContext(ReadingListContext);
