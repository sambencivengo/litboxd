// import React from 'react';
// import { BookResult } from './BookSearchBar';

// interface BookContextData {
// 	book: BookResult | null;
// 	setBook: React.Dispatch<React.SetStateAction<BookResult | null>>;
// }

// interface BookProviderProps {
// 	children: React.ReactNode;
// }

// const BookContext = React.createContext<BookContextData>({
// 	book: null,
// 	setBook: () => null,
// });

// export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
// 	const [book, setBook] = React.useState<BookResult | null>(null);

// 	return (
// 		<BookContext.Provider value={{ setBook, book }}>
// 			{children}
// 		</BookContext.Provider>
// 	);
// };

// export const useBook = () => React.useContext(BookContext);

// TODO: Find better use for this context file
