process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

// const should = chai.should();

chai.use(chaiHttp);
