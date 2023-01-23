import React from 'react';
import { Review } from '../../src/entities';
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
	getReviews: () => Promise<void>;
	reviews: Review[];
}

const ReviewContext = React.createContext<ReviewContextData>({
	rateBook: async () => {},
	reviews: [],
	getReviews: async () => {},
});

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
	const [reviews, setReviews] = React.useState<Review[]>([]);
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

	React.useEffect(() => {
		getReviews();
	}, []);

	const getReviews = async () => {
		try {
			const res = await fetch('/api/reviews');
			const data = await res.json();
			setReviews(data);
		} catch (error) {
			console.error(error);
			return;
		}
	};

	return (
		<ReviewContext.Provider
			value={{
				rateBook,
				getReviews,
				reviews,
			}}
		>
			{children}
		</ReviewContext.Provider>
	);
};

export const useReview = () => React.useContext(ReviewContext);
