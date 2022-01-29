import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'sass/main.scss';
import store from 'redux/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
