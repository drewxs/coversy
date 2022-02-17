import { createTheme } from '@mui/material/styles';
import variables from 'scss/abstract/_variables.scss';

export const theme = createTheme({
	typography: {
		fontFamily: variables.fontBody,
	},
	palette: {
		primary: { main: variables.primary, contrastText: '#fff' },
		secondary: { main: variables.secondary, contrastText: '#fff' },
		contrastThreshold: 3,
		tonalOffset: 0.2,
		spacing: 2,
	},
});
