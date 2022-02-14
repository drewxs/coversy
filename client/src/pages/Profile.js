import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";






export const Profile = () => {
	const [user, setUser] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [middleInitial, setMiddleInitial] = useState('');
	const [profileimg, setProfileimg] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [site, setSite] = useState('');
	const [phone, setPhone] = useState('');


	
	// const user = {
	// 	firstName: 'John',
	// 	lastName: 'Doe',
	// 	middleInitial: 'M',
	// 	email: 'johndoe@gmail.com',
	// 	site: 'Ogden',
	// 	phone: '1231231231',
	// };




	return {
		setData: (user) => {
			let fullname = `${user.firstName} ${user.middleInitial} ${user.lastName}`;

			profileimg.src = user.picture.large;
			name.textContent = fullname;
			email.textContent = user.email;
			phone.textContent = user.phone;
			site.textContent = user.site;
		}
	}
})(
	);



fetch('--------')
	.then((resp) => resp.json())
	.then((user) => {
		Profile.setUser(user.results[0]);
	});


