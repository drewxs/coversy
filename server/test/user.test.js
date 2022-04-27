const { chai, server } = require('./test.config');

describe('Endpoint testing [users]', () => {
  let BAD_REQUEST = '555555';

  it('Get user by id', (done) => {
    chai
      .request(server)
      .get(`/api/user/${process.env.TEST_TEACHER}`)
      .set('auth-token', process.env.TEST_TOKEN)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Get user by id unauthorized request', (done) => {
    chai
      .request(server)
      .get(`/api/user/${process.env.TEST_TEACHER}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Get users by site', (done) => {
    chai
      .request(server)
      .get(`/api/user/site/${process.env.TEST_SITE}`)
      .set('auth-token', process.env.TEST_TOKEN)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Get users by site unauthorized request', (done) => {
    chai
      .request(server)
      .get(`/api/user/site/${process.env.TEST_SITE}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Update user by id', (done) => {
    chai
      .request(server)
      .put(`/api/user/${process.env.TEST_TEACHER}`)
      .set('content-type', 'application/json')
      .set('auth-token', process.env.TEST_TOKEN)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Update user by id phone number validation fail', (done) => {
    chai
      .request(server)
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
    chai
      .request(server)
      .put(`/api/user/${process.env.TEST_TEACHER}/admin`)
      .set('content-type', 'application/json')
      .set('auth-token', process.env.TEST_TOKEN)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phone: '1111111111',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Update user as admin unauthorized request', (done) => {
    chai
      .request(server)
      .put(`/api/user/${process.env.TEST_TEACHER}/admin`)
      .set('content-type', 'application/json')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '1111111111',
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Update user as admin hourly rate validation fail', (done) => {
    chai
      .request(server)
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
    chai
      .request(server)
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
    chai
      .request(server)
      .put(`/api/user/${process.env.TEST_TEACHER}/activate`)
      .set('auth-token', process.env.TEST_TOKEN)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Toggle user activated by id bad request', (done) => {
    chai
      .request(server)
      .put(`/api/user/${BAD_REQUEST}S/activate`)
      .set('auth-token', process.env.TEST_TOKEN)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
