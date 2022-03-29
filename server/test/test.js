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
                res.should.have.status(404);
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
                `/api/user/555555/${process.env.S3_ACCESS_KEY}/deletepicture`
            )
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Endpoint testing [site]', () => {
    it('Create site', (done) => {
        chai.request(server)
            .post(`/api/site`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                name: 'test_site',
                address: {
                    street: 'test_street',
                    zip: 'A1A 1A1',
                    city: 'test_city',
                    province: 'AB',
                },
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('Create site zip validation fail', (done) => {
        chai.request(server)
            .post(`/api/site`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                name: 'test_site',
                address: {
                    street: 'test_street',
                    zip: 'A1A',
                    city: 'test_city',
                    province: 'AB',
                },
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Create site province validation fail', (done) => {
        chai.request(server)
            .post(`/api/site`)
            .set('content-type', 'application/json')
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                name: 'test_site',
                address: {
                    street: 'test_street',
                    zip: 'A1A 1A1',
                    city: 'test_city',
                    province: 'CC',
                },
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Get all sites', (done) => {
        chai.request(server)
            .get(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Update site by id', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                name: 'Test Site',
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Update site by id fail', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                address: 'Test Site',
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Endpoint testing [payroll]', () => {
    it('Get all payrolls from a site', (done) => {
        chai.request(server)
            .get(`/api/payroll/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.status(200);
                done();
            });
    });
    it('Get all payrolls from a user', (done) => {
        chai.request(server)
            .get(`/api/payroll/user`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.status(200);
                done();
            });
    });
    it('Get site payroll by month', (done) => {
        chai.request(server)
            .get(`/api/payroll/site/2022-02`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.status(200);
                done();
            });
    });
    it('Get user payroll by month', (done) => {
        chai.request(server)
            .get(`/api/payroll/user/2022-02`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.status(200);
                done();
            });
    });
});
