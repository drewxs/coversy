import { createTheme } from '@mui/material/styles';
import variables from 'scss/abstract/_variables.scss';

export const theme = createTheme({
	typography: {
		fontFamily: `${(variables.fontBody, variables.fontBodyFallback)}`,
	},
	palette: {
		primary: {
			main: variables.primary,
		},
		secondary: { main: variables.secondary },
	},
});
