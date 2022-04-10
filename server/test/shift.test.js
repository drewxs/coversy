const { chai, server } = require('./test.config');

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
