import React from 'react';
import { CreateBookReview } from '../../src/schema';

interface ReviewProviderProps {
	children: React.ReactNode;
}

export interface RateBookArgs {
	rating: number;
	author: string;
	bookWorkKey: string;
}

interface ReviewContextData {
	rateBook: (a: RateBookArgs) => Promise<void>;
}

const ReviewContext = React.createContext<ReviewContextData>({
	rateBook: async () => {},
});

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
	const rateBook = async ({ rating, author, bookWorkKey }: RateBookArgs) => {
		CreateBookReview.uiSchema
			.validate({ rating, bookAuthor: author, bookWorkKey })
			.catch((error) => console.log(error));

		try {
			const res = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					rating,
					bookAuthor: author,
					bookWorkKey,
				}),
			});
			if (!res.ok) {
				console.log(await res.text());
				return;
			}
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ReviewContext.Provider
			value={{
				rateBook,
			}}
		>
			{children}
		</ReviewContext.Provider>
	);
};

export const useReview = () => React.useContext(ReviewContext);
