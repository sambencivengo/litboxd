import {
	Card,
	Stack,
	CardBody,
	Flex,
	Image,
	Text,
	Heading,
	Divider,
	CardFooter,
	Center,
	Box,
	Button,
	HStack,
	IconButton,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { BOOK_COVER_BASE_URL } from '../constants';
import { Review } from '../src/entities';
import { colors } from '../theme';
import { useReadingList } from './Context';
import { CreateReviewModal } from './CreateReviewModal';
import { StarRatingButtonContainer } from './StarRating';

interface ReviewCardProps {
	review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
	const [starRating, setStarRating] = React.useState<number>(0);
	const [bookIsOnList, setBookIsOnList] = React.useState(false);
	const { addToReadingList, removeFromReadingList, readingList } =
		useReadingList();
	const isMobile = useBreakpointValue({ base: true, md: false });
	// const {
	// 	isOpen: editReviewModalIsOpen,
	// 	onOpen: openEditReviewModal,
	// 	onClose: closeEditReviewModal,
	// } = useDisclosure();
	const {
		isOpen: reviewModalIsOpen,
		onOpen: openReviewModal,
		onClose: closeReviewModal,
	} = useDisclosure();

	React.useEffect(() => {
		if (
			readingList.find(
				(readingListBook) =>
					readingListBook.bookWorkKey === review.bookWorkKey
			)
		) {
			setBookIsOnList(true);
		}

		setStarRating(review.rating);
	}, [review]);

	const handleOptimisticFetch = async (action: 'add' | 'remove') => {
		let success: boolean;
		action === 'remove'
			? (success = await removeFromReadingList({
					bookWorkKey: review.bookWorkKey,
			  }))
			: (success = await addToReadingList({
					author: review.author,
					bookWorkKey: review.bookWorkKey,
					cover: review.cover,
					title: review.title,
			  }));

		if (!success) {
			setBookIsOnList(action === 'remove' ? true : false);
		}
	};
	return (
		<Card
			w={'100%'}
			direction={['column', 'column', 'row']}
			overflow="scroll"
			bgColor={colors.darkBlue}
			variant="outline"
		>
			<Center>
				<Image
					objectFit="contain"
					maxW={{ base: '100%', sm: '200px' }}
					src={
						review.cover
							? `${BOOK_COVER_BASE_URL}${review.cover}-L.jpg`
							: 'https://via.placeholder.com/150'
					}
					alt="Book Cover"
					fallbackSrc="https://via.placeholder.com/150"
				/>
			</Center>

			<Stack w={'100%'}>
				<CardBody>
					<Flex direction="column">
						<Stack gap={1}>
							<Heading color={colors.white} size="md">
								{review.title}
							</Heading>
							{review.author && (
								<Heading color={colors.white} size="sm">
									by {review.author}
								</Heading>
							)}
						</Stack>
						<Divider pt={2} />
						{review.reviewContent && (
							<Box w={'80%'} rounded={'sm'} p={5}>
								<Text color={colors.white} fontWeight={800}>
									Your Review:
								</Text>
								<Text color={colors.white} py="2">
									{review.reviewContent}
								</Text>
							</Box>
						)}
					</Flex>
				</CardBody>

				<CardFooter>
					<Stack
						alignItems="center"
						w={'100%'}
						direction={isMobile ? 'column' : 'row'}
						spacing={5}
					>
						<StarRatingButtonContainer
							starRating={starRating}
							setStarRating={setStarRating}
							submitOnStarClick={true}
							book={{
								author: review.author,
								bookWorkKey: review.bookWorkKey,
								title: review.title,
								cover: review.cover,
							}}
						/>
						<HStack>
							<Button
								leftIcon={<BsPencilSquare />}
								onClick={() => openReviewModal()}
							>
								Edit
							</Button>

							<Button
								leftIcon={<AiFillEye fontSize={30} />}
								color={bookIsOnList ? colors.green : null}
								onClick={() => {
									setBookIsOnList(!bookIsOnList);

									handleOptimisticFetch(
										bookIsOnList ? 'remove' : 'add'
									);
								}}
							>
								{bookIsOnList ? 'Remove' : 'Read'}
							</Button>
						</HStack>
					</Stack>
					<CreateReviewModal
						existingReview={review}
						book={review}
						closeReviewModal={closeReviewModal}
						reviewModalIsOpen={reviewModalIsOpen}
					/>
				</CardFooter>
			</Stack>
		</Card>
	);
};
