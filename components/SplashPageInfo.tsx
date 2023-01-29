import {
	Box,
	Center,
	UnorderedList,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { SplashListItem } from './SplashListItem';

interface SplashPageInfoProps {}

export const SplashPageInfo: React.FC<SplashPageInfoProps> = ({}) => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Center m={5}>
			<Box w={'100%'}>
				<UnorderedList spacing={2}>
					<SplashListItem
						text={"Search for books you've read or plan to read"}
						fadeDelay={500}
						marginLeft={isMobile ? '0px' : '100px'}
					/>

					<SplashListItem
						text={
							'Keep track of them by adding them to your Reading List'
						}
						fadeDelay={1000}
						marginLeft={isMobile ? '0px' : '200px'}
					/>
					<SplashListItem
						text={'Rate and write reviews books you have read'}
						fadeDelay={1500}
						marginLeft={isMobile ? '0px' : '300px'}
					/>
					<SplashListItem
						text={
							'See what others have to say about the books they are reading'
						}
						fadeDelay={2000}
						marginLeft={isMobile ? '0px' : '400px'}
					/>
				</UnorderedList>
			</Box>
		</Center>
	);
};
