const dotenv = require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint testing [users]', () => {
    let BAD_REQUEST = '555555';

    it('Get user by id', (done) => {
        chai.request(server)
            .get(`/api/user/${process.env.TEST_TEACHER}`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get user by id bad request', (done) => {
        chai.request(server)
            .get(`/api/user/${BAD_REQUEST}`)
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
    it('Get users by site bad request', (done) => {
        chai.request(server)
            .get(`/api/user/site/${BAD_REQUEST}`)
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
    it('Update user by id phone number validation fail', (done) => {
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
    it('Update user as admin', (done) => {
        chai.request(server)
            .put(`/api/user/${process.env.TEST_TEACHER}/admin`)
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
    it('Update user as admin bad request', (done) => {
        chai.request(server)
            .put(`/api/user/${BAD_REQUEST}/admin`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                firstName: 'SITE',
                lastName: 'ADMIN',
                phone: '1111111111',
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Update user as admin hourly rate validation fail', (done) => {
        chai.request(server)
            .put(`/api/user/${BAD_REQUEST}/admin`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                hourlyRate: 10000,
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Update user as admin tax rate validation fail', (done) => {
        chai.request(server)
            .put(`/api/user/${BAD_REQUEST}/admin`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                taxRate: 1000,
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
    it('Toggle user activated by id bad request', (done) => {
        chai.request(server)
            .put(`/api/user/${BAD_REQUEST}S/activate`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
