require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

module.exports = { chai, server };
