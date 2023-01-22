import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import { Layout } from '../components/Layout/Layout';
import { UserProvider } from '../components/Context';
import { ReadingListProvider } from '../components/Context/ReadingListProvider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<UserProvider>
				<ReadingListProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ReadingListProvider>
			</UserProvider>
		</ChakraProvider>
	);
}
