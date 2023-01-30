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
	reviewContent?: string;
}

interface ReviewContextData {
	isLoading: boolean;
	rateBook: (a: RateBookArgs) => Promise<void>;
	getReviews: () => Promise<void>;
	editReview: (a: EditReviewArgs) => Promise<void>;
	reviews: Review[];
}

const ReviewContext = React.createContext<ReviewContextData>({
	rateBook: async () => {},
	isLoading: false,
	reviews: [],
	getReviews: async () => {},
	editReview: async () => {},
});

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [reviews, setReviews] = React.useState<Review[]>([]);

	const rateBook = async ({
		rating,
		cover,
		title,
		author,
		bookWorkKey,
		reviewContent,
	}: RateBookArgs) => {
		CreateBookReview.uiSchema
			.validate({
				rating,
				author,
				title,
				cover,
				bookWorkKey,
				reviewContent,
			})
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
					reviewContent,
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

	const editReview = async ({
		rating,
		bookWorkKey,
		reviewContent,
	}: EditReviewArgs) => {
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
					reviewContent,
				}),
			});

			if (!res.ok) {
				console.log(await res.text());
				return;
			}
			await res.json();
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
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	return (
		<ReviewContext.Provider
			value={{
				isLoading,
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
