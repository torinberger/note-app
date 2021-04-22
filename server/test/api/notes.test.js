/* global describe */
/* global it */

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should(); // eslint-disable-line
const SERVERURL = `http://localhost:${process.env.PORT}`;

chai.use(chaiHttp);

describe('Notes', () => {
  describe('Ping Note API Without Auth', () => {
    it('it should return authentication error', (done) => {
      chai.request(SERVERURL)
        .get('/api/notes/ping')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
