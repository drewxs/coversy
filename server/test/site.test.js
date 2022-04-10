require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint testing [site]', () => {
    it('Get all sites', (done) => {
        chai.request(server)
            .get(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Update site', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                name: 'Test Site',
                address: {
                    street: '123 Main St',
                    zip: 'A1A1A1',
                    city: 'Anytown',
                    province: 'AB',
                },
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Update site address validation fail', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({ address: 'Test Site' })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Update site by id zip code validation fail', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                address: {
                    zip: '222-222',
                },
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Update site by id province validation fail', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                address: {
                    province: 'AA',
                },
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
