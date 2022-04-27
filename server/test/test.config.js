require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

process.env.CONNECTION_URL = process.env.TEST_CONNECTION_URL;
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

const setup = async () => {
  try {
    let user = await User.findOne({
      email: process.env.TEST_ADMIN_EMAIL,
    }).lean();
    process.env.TEST_TOKEN = jwt.sign(
      { _id: user._id, type: user.type, site: user.site },
      process.env.TOKEN_SECRET
    );
    process.env.TEST_SITE = user.site;

    user = await User.findOne({
      email: process.env.TEST_TEACHER_EMAIL,
    }).lean();
    process.env.TEST_TEACHER = user._id;
  } catch (error) {
    console.log(error);
  }
};
setup();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

module.exports = { chai, server };
