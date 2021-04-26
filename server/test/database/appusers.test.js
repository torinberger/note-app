/* global describe */
/* global it */

const chai = require('chai');
const database = require('../../database');

const should = chai.should(); // eslint-disable-line

describe('App User Database Controller', () => {
  describe('Add User', () => {
    it('it should create and return a user',
      () => database.appusers.addUser('dbtest', 'test')
        .then((res) => {
          res.should.be.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));
    it('it should not create and return a user with the user already exists',
      () => database.appusers.addUser('dbtest', 'test')
        .then((res) => {
          res.should.not.be.equal(true);
        })
        .catch((err) => {
          err.should.be.an('error');
        }));
  });

  describe('Find User By Username', () => {
    it('it should return an object',
      () => database.appusers.findUserByUsername('dbtest')
        .then((res) => {
          res.should.be.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));
    it('it should not return an object when supplied an invalid username',
      () => database.appusers.findUserByUsername('fakeusername')
        .then((res) => {
          res.should.not.be.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Find User By Credentials', () => {
    it('it should return an object',
      () => database.appusers.findUserByCredentials('dbtest', 'test')
        .then((res) => {
          res.should.be.equal(true);
        })
        .catch((err) => {
          console.log(err);
          should.not.exist(err);
        }));
    it('it should not return an object when supplied an invalid credentials',
      () => database.appusers.findUserByCredentials('dbtest', 'fakepassword')
        .then((res) => {
          res.should.not.be.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Delete User', () => {
    it('it should delete a user',
      () => database.appusers.deleteUserByUsername('dbtest')
        .then((res) => {
          res.should.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));

    it('it should return an error when user doesn\'t exist',
      () => database.appusers.deleteUserByUsername('dbtest')
        .then((res) => {
          res.should.not.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });
});
