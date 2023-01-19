import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import { NavBar } from './NavBar';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<NavBar />
			<Box h="100vh" w="full" px={10}>
				<Center>
					<main>{children}</main>
				</Center>
			</Box>
		</>
	);
};
