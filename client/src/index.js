import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import 'scss/main.scss';
import { App } from 'App';
import { theme } from 'config/theme';
import store from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
