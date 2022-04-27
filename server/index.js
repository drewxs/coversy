require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.CONNECTION_URL
    : process.env.TEST_CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/notification', require('./routes/notification.route'));
app.use('/api/payroll', require('./routes/payroll.route'));
app.use('/api/shift', require('./routes/shift.route'));
app.use('/api/site', require('./routes/site.route'));
app.use('/api/ticket', require('./routes/ticket.route'));
app.use('/api/user', require('./routes/user.route'));

module.exports = app;
