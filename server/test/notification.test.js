require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint testing [notifications]', () => {
    it('Get notifications for user', (done) => {
        chai.request(server)
            .get(`/api/notification`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Read notification bad request', (done) => {
        chai.request(server)
            .put(`/api/notification`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});
