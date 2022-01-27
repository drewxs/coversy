const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const shiftRoute = require('./routes/shift.route');

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
	origin:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://google.com',
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/shifts', shiftRoute);

module.exports = app;
