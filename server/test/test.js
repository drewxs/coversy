const dotenv = require('dotenv').config();

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Performing pre-test cleaning', () => {
	it('Delete all test shifts', (done) => {
		chai.request(server)
			.delete(`/api/shifts/site/${process.env.TEST_SITE}`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

describe('Endpoint testing [shifts]', () => {
	let shiftId;

	it('Get all shifts', (done) => {
		chai.request(server)
			.get('/api/shifts')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Create shift', (done) => {
		chai.request(server)
			.post(`/api/shifts/site/${process.env.TEST_SITE}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				teacher: process.env.TEST_USER,
				startTime: '2020-01-01T00:00:00.000Z',
				endTime: '2020-01-01T00:00:00.000Z',
				site: process.env.TEST_SITE,
			})
			.end((err, res) => {
				if (err) done(err);
				shiftId = JSON.parse(res.text)._id;
				res.should.have.status(201);
				done();
			});
	});
});
