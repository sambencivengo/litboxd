import {
	Box,
	Center,
	Container,
	Text,
	Divider,
	Heading,
	VStack,
	Image,
	chakra,
	Code,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { ReviewCard } from '../components/ReviewCard';
import { colors } from '../theme';

export default function About() {
	return (
		<>
			<Head>
				<title>Litboxd | About</title>

				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box>
				<Heading p={10} color={colors.white}>
					About Litboxd
				</Heading>
				<Divider />
				<Center mt={5}>
					<Container gap={10} centerContent>
						<Text>
							Litboxd is book platform in the vein of Letterboxd.
							The application leverages the Internet
							Archive&apos;s{' '}
							<chakra.span textDecoration="underline">
								<Link
									href={
										'https://openlibrary.org/developers/api'
									}
								>
									Open Library API
								</Link>
							</chakra.span>
							.
						</Text>
						<Text>
							The API has overall been a pleasure to work with,
							but can at times return data in a different format
							than expected. For example, some books may have a
							cover image when a general query is run through the
							search bar, but when fetching that book&apos;s
							identifier (<Code>bookWorkKey</Code>) through the
							API, expected data might be missing from the
							API&apos;s response. To see a representation of
							this, check out the JSON data returned by this
							request for{' '}
							<chakra.span textDecoration="underline">
								<Link
									href={
										'https://openlibrary.org/works/OL21501229W.json'
									}
								>
									Moby Dick
								</Link>
								.
							</chakra.span>{' '}
							You will notice that there is no property for a
							cover image in the returned response.
						</Text>
						<VStack>
							<Image
								h={'50px'}
								alt="Litboxd Logo"
								src="/litboxd-logo.png"
							/>
							<Heading size={'md'}>
								built by{' '}
								<chakra.span textDecoration={'underline'}>
									<Link href={'https://sambencivengo.com/'}>
										Sam Bencivengo
									</Link>
								</chakra.span>
							</Heading>
						</VStack>
					</Container>
				</Center>
			</Box>
		</>
	);
}
