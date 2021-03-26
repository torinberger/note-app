process.env.NODE_ENV = 'test';

const server = require('../index');
const database = require('../database/index');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Notes', () => {
  describe('/GET ping', () => {
    it('it should respond with "pong"', (done) => {
      chai.request(server)
        .post('/api/notes/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('string');
          done();
        });
    });
  });
});
