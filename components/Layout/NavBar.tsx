import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { colors } from '../../theme';
import { BookSearchBar } from '../BookSearchBar';
import { MobileMenu } from '../MobileMenu';
import { SignUpAndLoginModal } from '../SignUpAndLoginModal';
import { useUser } from '../UserProvider';

export const NavBar: React.FC = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formPurpose, setFormPurpose] = React.useState<
		'sign up' | 'log in'
	>();
	const { user, getMe } = useUser();
	const router = useRouter();

	const navBarOptions = () =>
		user ? (
			<Button
				color={colors.white}
				size="lg"
				variant="link"
				onClick={async () => {
					const res = await fetch('/api/users/logout', {
						method: 'DELETE',
					});
					if (!res.ok) {
						console.log('There was an issue logging out');
					}
					await getMe();
				}}
			>
				Log Out
			</Button>
		) : (
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
		);

	return (
		<Box
			sx={{
				_hover: {
					background:
						'linear-gradient(180deg, black, 20%, rgba(0, 0, 0, 0) 90%)',
				},
			}}
			py={5}
			px={[5, 20, 50, 100, 300]}
		>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Heading size="lg" color={'white'}>
					Litboxd
				</Heading>
				<BookSearchBar />
				<HStack>
					{isMobile ? (
						<MobileMenu
							onOpen={onOpen}
							setFormPurpose={setFormPurpose}
						/>
					) : (
						navBarOptions()
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
