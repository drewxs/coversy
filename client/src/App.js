import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Profile } from 'pages/Profile';
import { Login } from 'pages/Login';
import { Registration } from 'pages/Registration';
import { RegistrationUser } from 'pages/RegistrationUser';

export const App = () => {
	
	return (
		<div>
			<Registration/> 
			<RegistrationUser/> 
		</div>
	);
};
