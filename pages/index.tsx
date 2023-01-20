import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Litboxd</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Box>
					<Heading size={'md'} color={colors.white}>
						A social platform for sharing your taste in literature
						and books.
					</Heading>
					<Divider />
				</Box>
			</main>
		</>
	);
}
