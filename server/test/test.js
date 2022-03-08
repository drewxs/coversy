const dotenv = require('dotenv').config();

process.env.NODE_ENV = 'test';
// let secret = process.env.SECRET;

// let mongoose = require('mongoose');
// let Post = require('../models/post.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Performing pre-test cleaning', () => {
	it('Cleaning post data', (done) => {
		chai.request(server)
			.delete(`/api/posts/delete/tests`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({ secret: process.env.ADMIN_SECRET })
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

describe('Endpoint testing [posts]', () => {
	let postId;

	it('Get posts', (done) => {
		chai.request(server)
			.get('/api/posts/0')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Create post', (done) => {
		chai.request(server)
			.post('/api/posts')
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({
				author: process.env.TEST_ID,
				text: 'Test post',
			})
			.end((err, res) => {
				if (err) {
					done(err);
				} else {
					postId = JSON.parse(res.text)._id;
					res.should.have.status(201);
					done();
				}
			});
	});
	it('Get posts by user', (done) => {
		chai.request(server)
			.get(`/api/posts/user/${process.env.TEST_ID}/0`)
			.end((err, res) => {
				res.should.have.status(200);
				JSON.parse(res.text).length.should.equal(1);
				done();
			});
	});
	it('Edit post', (done) => {
		chai.request(server)
			.put(`/api/posts/${postId}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.send({ text: 'Test post edited' })
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Like post', (done) => {
		chai.request(server)
			.put(`/api/posts/${postId}/${process.env.TEST_ID}`)
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				if (err) {
					done(err);
				} else {
					res.should.have.status(200);
					done();
				}
			});
	});
	it('Delete post', (done) => {
		chai.request(server)
			.delete(`/api/posts/${postId}`)
			.set('content-type', 'application/json')
			.set('auth-token', process.env.TEST_TOKEN)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

describe('Endpoint testing [user]', () => {
	it('Get user by ID', (done) => {
		chai.request(server)
			.get(`/api/user/${process.env.TEST_ID}`)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Get user by handle', (done) => {
		chai.request(server)
			.get(`/api/user/handle/${process.env.TEST_HANDLE}`)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('Get user by search', (done) => {
		chai.request(server)
			.get('/api/user/search/test')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
