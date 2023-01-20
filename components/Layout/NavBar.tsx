import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { SignUpAndLoginModal } from '../SignUpAndLoginModal';

export const NavBar: React.FC = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formPurpose, setFormPurpose] = React.useState<
		'sign up' | 'log in'
	>();

	return (
		<Box
			sx={{
				_hover: {
					background:
						'linear-gradient(180deg, black, 20%, rgba(0, 0, 0, 0) 90%)',
				},
			}}
			py={5}
			px={isMobile ? 5 : 300}
		>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Heading size="lg" color={'white'}>
					Litboxd
				</Heading>
				<HStack>
					{isMobile ? (
						// TODO: Navbar items
						<>Button</>
					) : (
						// TODO: Mobile navbar items
						<>
							<Button
								color={colors.white}
								size="lg"
								variant="link"
								onClick={() => {
									setFormPurpose('log in');
									onOpen();
								}}
							>
								Login
							</Button>
							<Button
								color={colors.white}
								size="lg"
								variant="link"
								onClick={() => {
									setFormPurpose('sign up');
									onOpen();
								}}
							>
								Sign Up
							</Button>
						</>
					)}
				</HStack>
			</Flex>
			<SignUpAndLoginModal
				purpose={formPurpose}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Box>
	);
};
