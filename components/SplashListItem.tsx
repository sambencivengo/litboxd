import { ScaleFade, ListItem, Heading, Box } from '@chakra-ui/react';
import React from 'react';

interface SplashListItemProps {
	text: string;
	fadeDelay: number;
	marginLeft: string;
}

export const SplashListItem: React.FC<SplashListItemProps> = ({
	fadeDelay,
	text,
	marginLeft,
}) => {
	const [showListItem, setShowListItem] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => setShowListItem(true), fadeDelay);
	}, [fadeDelay]);

	return (
		<Box ml={marginLeft}>
			<ScaleFade in={showListItem} initialScale={0.9}>
				<ListItem>
					<Heading size="sm">{text}</Heading>
				</ListItem>
			</ScaleFade>
		</Box>
	);
};
