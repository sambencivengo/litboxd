import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Heading,
} from '@chakra-ui/react';
import React from 'react';

interface SignUpModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Heading>Sign Up for Litboxd</Heading>
				<ModalCloseButton />
				<ModalBody>
					a;kdjna as;kjnasd;kn asdlk;nas dlkn asdlnkadslnkadslk asdl;k
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button variant="ghost">Secondary Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
