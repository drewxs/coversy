const dotenv = require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint testing [payroll]', () => {
    let BAD_REQUEST = '555555';

    it('Get all payrolls from a site', (done) => {
        chai.request(server)
            .get(`/api/payroll/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get all payrolls from a user', (done) => {
        chai.request(server)
            .get(`/api/payroll/user`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get site payroll by month', (done) => {
        chai.request(server)
            .get(`/api/payroll/site/2022-02`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get site payroll by month bad request', (done) => {
        chai.request(server)
            .get(`/api/payroll/site/${BAD_REQUEST}`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Get user payroll by month', (done) => {
        chai.request(server)
            .get(`/api/payroll/user/2022-02`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get user payroll by month bad request', (done) => {
        chai.request(server)
            .get(`/api/payroll/user/${BAD_REQUEST}`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
