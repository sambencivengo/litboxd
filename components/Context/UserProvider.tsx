import { useToast } from '@chakra-ui/react';
import React from 'react';
import { SimpleUser } from '../../src/types';
import { useReadingList } from './ReadingListProvider';
import { useReview } from './ReviewProvider';

interface UserProviderProps {
	children: React.ReactNode;
}

interface LoginAndSignUpArgs {
	username: string;
	password: string;
}

interface UserContextData {
	isLoading: boolean;
	user: SimpleUser | null;
	signUp: (a: LoginAndSignUpArgs) => Promise<boolean>;
	login: (a: LoginAndSignUpArgs) => Promise<boolean>;
	getMe: () => Promise<void>;
}

const UserContext = React.createContext<UserContextData>({
	user: null,
	isLoading: false,
	signUp: async () => false,
	getMe: async () => {},
	login: async () => false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [user, setUser] = React.useState<SimpleUser | null>(null);
	const { getReadingList } = useReadingList();
	const { getReviews } = useReview();
	const toast = useToast();

	const getMe = async (): Promise<void> => {
		try {
			const res = await fetch(`/api/users/me`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!res.ok) {
				console.error(await res.text());
				setUser(null);
				return;
			}

			const data = await res.json();
			setUser(data);
			getReviews();
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	React.useEffect(() => {
		getMe();
	}, []);

	const login = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<boolean> => {
		try {
			const res = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
				credentials: 'include',
			});

			if (!res.ok) {
				setUser(null);
				toast({
					title: await res.text(),
					description: 'Please sign up to create an account',
					status: 'error',
					variant: 'solid',
					duration: 2000,
					isClosable: true,
					position: 'top',
				});
				return false;
			}

			const data: SimpleUser = await res.json();
			getReadingList();
			getReviews;
			setUser(data);
			return true;
		} catch (error) {
			setUser(null);
			console.error(error);
			return false;
		}
	};

	const signUp = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<boolean> => {
		try {
			const res = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
				credentials: 'include',
			});

			if (!res.ok) {
				setUser(null);
				toast({
					title: await res.text(),
					status: 'error',
					variant: 'solid',
					duration: 2000,
					isClosable: true,
					position: 'top',
				});
				return false;
			}
			const data: SimpleUser = await res.json();
			setUser(data);
			return true;
		} catch (error) {
			setUser(null);
			console.error(error);
			return false;
		}
	};

	return (
		<UserContext.Provider value={{ getMe, login, user, isLoading, signUp }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
