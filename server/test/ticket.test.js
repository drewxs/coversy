const { chai, server } = require('./test.config');

describe('Endpoint testing [tickets]', () => {
    let BAD_REQUEST = '555555';

    it('Get unresolved tickets', (done) => {
        chai.request(server)
            .get(`/api/ticket/unresolved`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Get resolved tickets', (done) => {
        chai.request(server)
            .get(`/api/ticket/resolved`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    // it('Resolve ticket', (done) => {
    //     chai.request(server)
    //         .put(`/api/ticket/${process.env.TEST_TICKET}/resolve`)
    //         .set('auth-token', process.env.TEST_TOKEN)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });
    it('Resolve ticket bad request', (done) => {
        chai.request(server)
            .put(`/api/ticket/${BAD_REQUEST}/resolve`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    // it('Unresolve ticket', (done) => {
    //     chai.request(server)
    //         .put(`/api/ticket/${process.env.TEST_TICKET}/unresolve`)
    //         .set('auth-token', process.env.TEST_TOKEN)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });
    it('Unresolve ticket bad request', (done) => {
        chai.request(server)
            .put(`/api/ticket/${BAD_REQUEST}/unresolve`)
            .set('auth-token', process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
