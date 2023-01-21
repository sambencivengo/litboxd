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

interface MobileMenuProps {
	openLoginModal: () => void;
	setFormPurpose: React.Dispatch<React.SetStateAction<'sign up' | 'log in'>>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
	openLoginModal,
	setFormPurpose,
}) => {
	// TODO: FIX CHAKRA WARNINGS
	return (
		<Menu>
			<MenuButton as={IconButton} icon={<HamburgerIcon />} />
			<MenuList>
				<MenuItem
					icon={<FiLogIn />}
					onClick={() => {
						setFormPurpose('log in');
						openLoginModal();
					}}
				>
					Log In
				</MenuItem>
				<MenuItem
					icon={<FiUserPlus />}
					onClick={() => {
						setFormPurpose('sign up');
						openLoginModal();
					}}
				>
					Sign Up
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
