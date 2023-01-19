import {
	Box,
	Button,
	Flex,
	Heading,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { SignUpModal } from '../SignUpModal';

export const NavBar: React.FC = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box bgColor={colors.greyBlue} p={'10px'} px={4}>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Heading size="lg" color={'white'}>
					Litboxd
				</Heading>
				{isMobile ? (
					// TODO: Navbar items
					<>Button</>
				) : (
					// TODO: Mobile navbar items
					<Button onClick={() => onOpen()}>Sign Up</Button>
				)}
			</Flex>
			<SignUpModal isOpen={isOpen} onClose={onClose} />
		</Box>
	);
};
