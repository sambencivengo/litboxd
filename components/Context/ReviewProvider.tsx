import React from 'react';
import { Review } from '../../src/entities';
import { CreateBookReview, EditBookReview } from '../../src/schema';

interface ReviewProviderProps {
	children: React.ReactNode;
}

export interface RateBookArgs {
	rating: number;
	author: string;
	bookWorkKey: string;
	cover: number | undefined;
	title: string;
	reviewContent?: string;
}
interface EditReviewArgs {
	rating: number;
	bookWorkKey: string;
}

interface ReviewContextData {
	rateBook: (a: RateBookArgs) => Promise<void>;
	getReviews: () => Promise<void>;
	editReview: (a: EditReviewArgs) => Promise<void>;
	reviews: Review[];
	createOrEditReview: (a: RateBookArgs) => Promise<void>;
}

const ReviewContext = React.createContext<ReviewContextData>({
	rateBook: async () => {},
	reviews: [],
	getReviews: async () => {},
	editReview: async () => {},
	createOrEditReview: async () => {},
});

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
	const [reviews, setReviews] = React.useState<Review[]>([]);

	const rateBook = async ({
		rating,
		cover,
		title,
		author,
		bookWorkKey,
	}: RateBookArgs) => {
		CreateBookReview.uiSchema
			.validate({ rating, author, title, cover, bookWorkKey })
			.catch((error) => console.log(error));

		try {
			const res = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					rating,
					author,
					cover,
					title,
					bookWorkKey,
				}),
			});
			if (!res.ok) {
				console.log(await res.text());
				return;
			}
			await res.json();
			getReviews();
		} catch (error) {
			console.error(error);
		}
	};

	const editReview = async ({ rating, bookWorkKey }: EditReviewArgs) => {
		EditBookReview.uiSchema
			.validate({ rating })
			.catch((error) => console.log(error));

		try {
			const res = await fetch(`/api/reviews/${bookWorkKey}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					rating,
				}),
			});
			if (!res.ok) {
				console.log(await res.text());
				return;
			}
			await res.json();
			getReviews();
		} catch (error) {
			console.error(error);
		}
	};

	const createOrEditReview = async ({
		author,
		bookWorkKey,
		cover,
		rating,
		title,
		reviewContent,
	}: RateBookArgs) => {
		try {
			const res = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					rating,
					author,
					cover,
					title,
					bookWorkKey,
					reviewContent,
				}),
			});
			if (!res.ok) {
				console.log(await res.text());
				return;
			}
			await res.json();
			getReviews();
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
				createOrEditReview,
				editReview,
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
