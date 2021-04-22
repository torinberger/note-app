/* global describe */
/* global it */

const chai = require('chai');
const database = require('../../database');

const should = chai.should(); // eslint-disable-line

describe('App User Database Controller', () => {
  describe('Find User By Username', () => {
    it('it should return an object',
      () => database.appusers.findUserByUsername('test')
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
      () => database.appusers.findUserByCredentials('test', 'test')
        .then((res) => {
          res.should.be.equal(true);
        })
        .catch((err) => {
          console.log(err);
          should.not.exist(err);
        }));
    it('it should not return an object when supplied an invalid credentials',
      () => database.appusers.findUserByCredentials('test', 'fakepassword')
        .then((res) => {
          res.should.not.be.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Add User', () => {
    it('it should create and return a user',
      () => database.appusers.addUser('test2', 'test2')
        .then((res) => {
          res.should.be.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));
    it('it should not create and return a user with the user already exists',
      () => database.appusers.addUser('test2', 'test2')
        .then((res) => {
          res.should.not.be.equal(true);
        })
        .catch((err) => {
          err.should.be.an('error');
        }));
  });

  describe('Delete User', () => {
    it('it should delete a user',
      () => database.appusers.deleteUser('test2', 'test2')
        .then((res) => {
          res.should.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));

    it('it should return an error when user doesn\'t exist',
      () => database.appusers.deleteUser('test2', 'test2')
        .then((res) => {
          res.should.not.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });
});
