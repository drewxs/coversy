const dotenv = require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Performing pre-test cleaning', () => {
	it('Delete all test shifts', (done) => {
		chai.request(server)
			.delete(`/api/shift`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

describe('Endpoint testing [shifts]', () => {
	let shiftId;

	it('Create shift', (done) => {
		chai.request(server)
			.post(`/api/shift`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				teacher: process.env.TEST_TEACHER_EMAIL,
				startTime: '2020-01-01T00:00:00.000Z',
				endTime: '2020-01-01T00:00:00.000Z',
			})
			.end((err, res) => {
				if (err) done();
				shiftId = JSON.parse(res.text)._id;
				res.should.have.status(201);
				done();
			});
	});
	it('Get shifts by site', (done) => {
		chai.request(server)
			.get(`/api/shift`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Get posted shifts by site', (done) => {
		chai.request(server)
			.get(`/api/shift/posted`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Update shift by id', (done) => {
		chai.request(server)
			.put(`/api/shift/${shiftId}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				startTime: '2022-10-20T21:00:00.000Z',
				endTime: '2022-10-20T22:00:00.000Z',
			})
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Delete all test shifts', (done) => {
		chai.request(server)
			.delete(`/api/shift`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

// test liam branch
describe('Endpoint testing [users]', () => {
	it('Get user by id', (done) => {
		chai.request(server)
			.get(`/api/user/${process.env.TEST_TEACHER}`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Get user by id fail', (done) => {
		chai.request(server)
			.get(`/api/user/555555`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
	it('Get users by site', (done) => {
		chai.request(server)
			.get(`/api/user/site/${process.env.TEST_SITE}`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Get users by site fail', (done) => {
		chai.request(server)
			.get(`/api/user/site/555555`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('Update user by id', (done) => {
		chai.request(server)
			.put(`/api/user/${process.env.TEST_TEACHER}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				firstName: 'SITE',
				lastName: 'ADMIN',
				phone: '1111111111',
			})
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Update user by id fail', (done) => {
		chai.request(server)
			.put(`/api/user/${process.env.TEST_TEACHER}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				phone: '1',
			})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('Toggle user activated by id', (done) => {
		chai.request(server)
			.put(`/api/user/${process.env.TEST_TEACHER}/activate`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Toggle user activated by id fail', (done) => {
		chai.request(server)
			.put(`/api/user/555555/activate`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('Update user profile picture by id', (done) => {
		chai.request(server)
			.put(`/api/user/${process.env.TEST_TEACHER}/updatepicture`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				avatar: 'user/images/' + process.env.S3_ACCESS_KEY,
			})
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Update user profile picture by id fail', (done) => {
		chai.request(server)
			.put(`/api/user/555555/updatepicture`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				avatar: 'user/images/' + process.env.S3_ACCESS_KEY,
			})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('Delete user profile picture', (done) => {
		chai.request(server)
			.delete(
				`/api/user/${process.env.TEST_TEACHER}/${process.env.S3_ACCESS_KEY}/deletepicture`
			)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Delete user profile picture fail', (done) => {
		chai.request(server)
			.delete(
				`/api/user/5555555/${process.env.S3_ACCESS_KEY}/deletepicture`
			)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});
