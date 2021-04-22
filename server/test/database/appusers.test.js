/* global describe */
/* global it */

const chai = require('chai');
const database = require('../../database');

const should = chai.should(); // eslint-disable-line

describe('App Users', () => {
  describe('Find Users', () => {
    it('it should respond with an array',
      () => database.appusers.findUsers()
        .then((res) => {
          res.should.be.an('array');
        })
        .catch((err) => {
          should.not.exist(err);
        }));
  });

  describe('Find User By Username', () => {
    it('it should return an object',
      () => database.appusers.findUserByUsername('test')
        .then((res) => {
          res.should.be.an('object');
        })
        .catch((err) => {
          should.not.exist(err);
        }));
  });

  describe('Find User By Invalid Username', () => {
    it('it should not return an object',
      () => database.appusers.findUserByUsername('fakeusername')
        .then((res) => {
          res.should.not.be.an('object');
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Find User By Credentials', () => {
    it('it should return an object',
      () => database.appusers.findUserByUsername('test', 'test')
        .then((res) => {
          res.should.be.an('object');
        })
        .catch((err) => {
          should.not.exist(err);
        }));
  });

  describe('Find User By Invalid Credentials', () => {
    it('it should not return an object',
      () => database.appusers.findUserByUsername('test', 'wrongpassword')
        .then((res) => {
          res.should.not.be.an('object');
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Add User', () => {
    it('it should create and return a user',
      () => database.appusers.addUser('test2', 'test2')
        .then((res) => {
          res.should.be.an('object');
        })
        .catch((err) => {
          should.not.exist(err);
        }));
  });

  describe('Add Pre-Existing User', () => {
    it('it should not create and return a user',
      () => database.appusers.addUser('test2', 'test2')
        .then((res) => {
          res.should.not.be.an('object');
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
  });

  describe('Delete Invalid User', () => {
    it('it should not delete the user',
      () => database.appusers.deleteUser('test2', 'test2')
        .then((res) => {
          res.should.not.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });
});
