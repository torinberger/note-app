/* global describe */
/* global it */

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should(); // eslint-disable-line
const SERVERURL = `http://localhost:${process.env.PORT}`;

chai.use(chaiHttp);

describe('Auth', () => {
  describe('Ping Auth API Without Auth', () => {
    it('it should respond with "pong"', (done) => {
      chai.request(SERVERURL)
        .get('/api/auth/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.contain('pong');
          done();
        });
    });
  });

  describe('Signup', () => {
    it('it should return status 201', (done) => {
      chai.request(SERVERURL)
        .post('/api/auth/signup')
        .send({
          username: 'test',
          password: 'test',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
