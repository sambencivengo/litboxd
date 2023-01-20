import { DeepPartial, extendTheme, Theme, ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
};

export const colors = {
	darkBlue: '#14181c',
	green: '#00c030',
	orange: '#ff7d00',
	greyBlue: '#456',
	grey: '#abc',
	deepRed: '#D90429',
	white: '#FFFFFF',
};

export const theme = extendTheme({
	...config,
	// components: {
	// 	Button: {
	// 		variants: {
	// 			solid: () => ({
	//
	// 			}),
	// 		},
	// 	},
	// 	Input: {
	// 		variants: {
	// 			filled: {
	// 				field: {
	// 			},
	// 		},
	// 	},
	// },
	styles: {
		global: () => ({
			body: {
				backgroundColor: colors.darkBlue,
				color: colors.grey,
			},
			'::-webkit-scrollbar': { display: 'none' },
		}),
	},
	colors,
}) as DeepPartial<Theme>;
