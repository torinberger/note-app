process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
// const database = require('../database/index');

const should = chai.should();
const serverURL = `http://localhost:${process.env.PORT}`;

chai.use(chaiHttp);

describe('Notes', () => {
  describe('Ping Note API Without Auth', () => {
    it('it should return authentication error', (done) => {
      chai.request(serverURL)
        .get('/api/notes/ping')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('Auth', () => {
  describe('Ping Auth API Without Auth', () => {
    it('it should respond with "pong"', (done) => {
      chai.request(serverURL)
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
      chai.request(serverURL)
        .post('/api/auth/signup')
        .send({
          username: 'test',
          password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
