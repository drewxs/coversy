const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.CONFIRM_USER,
		pass: process.env.CONFIRM_PASS,
	},
});

exports.sendConfirmationEmail = (name, email, confirmationCode) => {
	transport
		.sendMail({
			from: user,
			to: email,
			subject: 'Please confirm your account',
			html: `<h1>Email Confirmation</h1>
        <h2>Hi ${name}</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=${process.env.API_URL}/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
		})
		.catch((err) => console.log(err));
};
