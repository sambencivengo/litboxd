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

const Input = {
	variants: {
		auth: {
			field: {
				border: '1px solid',
				borderColor: 'gray.400',
				color: 'black',
				_focus: {
					boxShadow: '0 0 2px 2px #38B2AC',
				},
			},
		},
	},
};

//  TODO: Work on styling (later, stop wasting time with it)
const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
	// define the part you're going to style
	field: {
		backgroundColor: colors.darkBlue,
		color: colors.greyBlue, // change the input text color
		// borderColor:
		_hover: {
			borderColor: colors.grey,
		},
		_focus: {
			backgroundColor: colors.darkBlue,
		},
	},
});

export const theme = extendTheme({
	...config,
	components: {
		Input: {
			baseStyle: {
				field: {
					background: colors.deepRed,
					color: colors.white, // change the input text color
				},
			},
		},
		Button: {
			variants: {
				solid: {
					backgroundColor: colors.greyBlue,
					color: colors.white,
				},
			},
		},
		// Input: {
		// 	variants: {
		// 		filled: {
		// 			field: {
		// 				bgCO
		// 		},
		// 	},
		// },
	},
	styles: {
		global: () => ({
			body: {
				backgroundColor: colors.darkBlue,
				color: colors.white,
			},
			'::-webkit-scrollbar': { display: 'none' },
		}),
	},
	colors,
} as DeepPartial<Theme>);
