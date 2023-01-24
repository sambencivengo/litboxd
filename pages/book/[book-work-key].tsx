import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BOOK_URL } from '../../constants';
import { BookWithDetails } from '../../components/BookWithDetails';

export interface Book {
	title: string;
	covers?: number[];
	subjects?: string[];
	description?: {
		value: string;
	};
}

export default function BookWorkKey() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState<Book>(null);
	const [author, setAuthor] = React.useState<string | string[] | null>(null);
	const bookWorkKey = router.query['book-work-key'];

	React.useEffect(() => {
		setIsLoading(true);
		const getBookInfo = async () => {
			const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
			const data = await res.json();

			setBook(data);
			setAuthor(router.query.author);
		};

		setIsLoading(false);

		if (router.isReady) {
			getBookInfo();
		}
	}, [bookWorkKey, router.query.author, router.isReady]);

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<>
			<main>
				{book && (
					<BookWithDetails
						imageSize="L"
						author={author}
						book={book}
						bookWorkKey={bookWorkKey}
					/>
				)}
			</main>
		</>
	);
}
