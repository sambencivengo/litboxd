import { Box, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { BookSearchBar } from '../BookSearchBar';
import { NavBar } from './NavBar';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<>
			<NavBar />
			<Box mt={5} px={[5, 20, 50, 100, 300]}>
				<BookSearchBar />
			</Box>

			<Box
				mt={isMobile ? 10 : 100}
				h="100vh"
				w="full"
				px={[5, 20, 50, 100, 300]}
			>
				<main>{children}</main>
			</Box>
		</>
	);
};
