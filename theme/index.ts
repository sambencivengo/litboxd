import { inputAnatomy } from '@chakra-ui/anatomy';
import {
	color,
	createMultiStyleConfigHelpers,
	DeepPartial,
	extendTheme,
	Theme,
	ThemeConfig,
} from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	initialColorMode: 'dark',
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

//  TODO: Work on styling (later, stop wasting time with it)
// const { definePartsStyle, defineMultiStyleConfig } =
// 	createMultiStyleConfigHelpers(inputAnatomy.keys);

// const baseStyle = definePartsStyle({
// 	addon: {},
// 	field: {
// 		borderColor: colors.white,
// 		_hover: {
// 			borderColor: colors.greyBlue,
// 		},
// 	},
// });

// const inputTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
	...config,
	components: {
		// Input: inputTheme,
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
	},
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
