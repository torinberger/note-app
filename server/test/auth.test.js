process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../index');

// const notes = require('../database/controllers/notes');

// const should = chai.should();

chai.use(chaiHttp);

/*
describe('Notes', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
     done();
    });
  });

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

  describe('/POST get', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
        .post('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
*/
