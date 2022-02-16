const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const shiftRoute = require('./routes/shift.route');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const siteRoute = require('./routes/site.route');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server is running on port: ${PORT}`)
		)
	)
	.catch((err) => console.log(err.message));

var corsOptions = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/shifts', shiftRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/site', siteRoute);

module.exports = app;
