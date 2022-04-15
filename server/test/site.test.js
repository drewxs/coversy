const { chai, server } = require('./test.config');

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
                    postalCode: 'A1A1A1',
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
    it('Update site by id postal code validation fail', (done) => {
        chai.request(server)
            .put(`/api/site`)
            .set('auth-token', process.env.TEST_TOKEN)
            .send({
                address: {
                    postalCode: '222-222',
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
