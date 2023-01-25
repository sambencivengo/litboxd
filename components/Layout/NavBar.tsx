import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Image,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { colors } from '../../theme';
import { useUser } from '../Context';
import { MobileMenu } from '../MobileMenu';
import { SignUpAndLoginModal } from '../SignUpAndLoginModal';

export const NavBar: React.FC = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const {
		isOpen: loginModalIsOpen,
		onOpen: openLoginModal,
		onClose: closeLoginModal,
	} = useDisclosure();

	const [formPurpose, setFormPurpose] = React.useState<
		'sign up' | 'log in'
	>();
	const { user, getMe } = useUser();

	const navBarOptions = () =>
		user ? (
			<>
				<Button color={colors.white} size="lg" variant="link">
					<Link href={'/reading-list'}>Reading List</Link>
				</Button>
				<Button color={colors.white} size="lg" variant="link">
					<Link href={'/about'}>About</Link>
				</Button>
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
			</>
		) : (
			<>
				<Button
					color={colors.white}
					size="lg"
					variant="link"
					onClick={() => {
						setFormPurpose('log in');
						openLoginModal();
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
						openLoginModal();
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
				<HStack>
					<Image
						h={8}
						aria-label="litboxd logo"
						src="/litboxd-logo.png"
					/>
					<Heading size="lg" color={'white'}>
						<Link href={'/'}>Litboxd</Link>
					</Heading>
				</HStack>
				<HStack>
					{isMobile ? (
						<MobileMenu
							openLoginModal={openLoginModal}
							setFormPurpose={setFormPurpose}
						/>
					) : (
						navBarOptions()
					)}
				</HStack>
			</Flex>
			<SignUpAndLoginModal
				purpose={formPurpose}
				loginModalIsOpen={loginModalIsOpen}
				closeLoginModal={closeLoginModal}
			/>
		</Box>
	);
};
