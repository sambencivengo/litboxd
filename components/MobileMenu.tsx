import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { useUser } from './Context';
import Link from 'next/link';

interface MobileMenuProps {
	openLoginModal: () => void;
	setFormPurpose: React.Dispatch<React.SetStateAction<'sign up' | 'log in'>>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
	openLoginModal,
	setFormPurpose,
}) => {
	// TODO: DRY UP CODE
	const { user, getMe } = useUser();
	return (
		<Menu>
			<MenuButton as={IconButton} icon={<HamburgerIcon />} />
			<MenuList bgColor={colors.darkBlue}>
				{user ? (
					<>
						<MenuItem
							bgColor={colors.darkBlue}
							color={colors.white}
						>
							<Link href={'/reviews'}>Reviews</Link>
						</MenuItem>
						<MenuItem
							bgColor={colors.darkBlue}
							color={colors.white}
						>
							<Link href={'/reading-list'}>Reading List</Link>
						</MenuItem>
						<MenuItem
							bgColor={colors.darkBlue}
							color={colors.white}
						>
							<Link href={'/about'}>About</Link>
						</MenuItem>

						<MenuItem
							bgColor={colors.darkBlue}
							color={colors.white}
							onClick={async () => {
								const res = await fetch('/api/users/logout', {
									method: 'DELETE',
								});
								if (!res.ok) {
									console.log(
										'There was an issue logging out'
									);
								}
								await getMe();
							}}
						>
							Log Out
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem
							bgColor={colors.darkBlue}
							icon={<FiLogIn />}
							onClick={() => {
								setFormPurpose('log in');
								openLoginModal();
							}}
						>
							Log In
						</MenuItem>
						<MenuItem
							bgColor={colors.darkBlue}
							icon={<FiUserPlus />}
							onClick={() => {
								setFormPurpose('sign up');
								openLoginModal();
							}}
						>
							Sign Up
						</MenuItem>
					</>
				)}
			</MenuList>
		</Menu>
	);
};
