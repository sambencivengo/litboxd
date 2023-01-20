import React from 'react';
import { setSourceMapRange } from 'typescript';
import { SimpleUser } from '../src/types';

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
	signUp: (a: LoginAndSignUpArgs) => Promise<void>;
	login: (a: LoginAndSignUpArgs) => Promise<void>;
}

const UserContext = React.createContext<UserContextData>({
	user: null,
	isLoading: false,
	signUp: async () => {},

	login: async () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [user, setUser] = React.useState<SimpleUser | null>(null);

	React.useEffect(() => {
		const getMe = async (): Promise<void> => {
			try {
				const res = await fetch(`/api/users/me`, {
					method: 'GET',
					credentials: 'include',
				});

				if (!res.ok) {
					setUser(null);
				}

				const data = await res.json();
				setUser(data);
				console.log(user);
			} catch (error) {
				setUser(null);
				console.error(error);
			}
		};
		getMe();
	}, []); // Use callback?

	const login = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<void> => {
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
				return;
			}

			const data: SimpleUser = await res.json();
			setUser(data);
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	const signUp = async ({
		username,
		password,
	}: LoginAndSignUpArgs): Promise<void> => {
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
				return;
			}
			const data: SimpleUser = await res.json();
			setUser(data);
		} catch (error) {
			setUser(null);
			console.error(error);
		}
	};

	return (
		<UserContext.Provider value={{ login, user, isLoading, signUp }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => React.useContext(UserContext);
