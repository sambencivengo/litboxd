import { Image, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BOOK_COVER_BASE_URL, BOOK_URL } from '../../constants';

interface Book {}

export default function BookWorkKey() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const [book, setBook] = React.useState(null);
	const bookWorkKey = router.query['book-work-key'];
	const { cover } = router.query;

	React.useEffect(() => {
		setIsLoading(true);
		// const getBookInfo = async () => {
		// 	const res = await fetch(`${BOOK_URL}${bookWorkKey}.json`);
		// 	const data = await res.json();

		// 	console.log(data);

		// 	setBook(data);
		// };

		// const getAuthorInfo = async () => {
		// 	const res = await fetch(`${AUTHORS_URL}${book.authors.key}`);
		// 	const data = await res.json();
		// 	console.log(data);
		// };
		setIsLoading(false);

		if (router.isReady) {
			// getBookInfo();
		}
	}, [bookWorkKey, router.isReady]);

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
					<Image
						alignSelf={'center'}
						objectFit="cover"
						maxH="300px"
						src={`${BOOK_COVER_BASE_URL}${cover}-L.jpg`}
						alt={`Book Cover`}
					/>
				)}
			</main>
		</>
	);
}
