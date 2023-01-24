import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BOOK_URL } from '../../constants';
import { BookWithDetails } from '../../components/BookWithDetails';
import { BookForDatabase } from '../../src/types';

export default function BookWorkKey() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState<BookForDatabase>(null);
	const bookWorkKey = router.query['book-work-key'];

	React.useEffect(() => {
		setIsLoading(true);
		const getBookInfo = async () => {
			// NOTE: if the book exists in a review or on the reading list,
			// these properties will come from the DB, in this file,
			// they are populated by the API and query parameters.

			// We will take the data from the API and only keep what we will need
			// in the DB, now typing across the app will be simple and consistent,
			// regardless of its origin (DB, API)
			const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
			const data = await res.json();

			setBook({
				cover: data.covers[0],
				bookWorkKey,
				author: router.query.author,
				title: data.title,
			});
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

	console.log(book);

	return (
		<>
			<main>{book && <BookWithDetails book={book} imageSize="L" />}</main>
		</>
	);
}
