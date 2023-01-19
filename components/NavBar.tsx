import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';

export const NavBar: React.FC = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Box bgColor={colors.greyBlue} p={'10px'} px={4}>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Heading size="lg" color={'white'}>
					Litboxd
				</Heading>
				{isMobile ? (
					// TODO: Navbar items
					<></>
				) : (
					// TODO: Mobile navbar items
					<></>
				)}
			</Flex>
		</Box>
	);
};
