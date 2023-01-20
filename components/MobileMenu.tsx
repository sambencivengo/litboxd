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
	onOpen: () => void;
	setFormPurpose: React.Dispatch<React.SetStateAction<'sign up' | 'log in'>>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
	onOpen,
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
						onOpen();
					}}
				>
					Log In
				</MenuItem>
				<MenuItem
					icon={<FiUserPlus />}
					onClick={() => {
						setFormPurpose('sign up');
						onOpen();
					}}
				>
					Sign Up
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
