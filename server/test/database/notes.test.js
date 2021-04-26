/* global describe */
/* global it */

const chai = require('chai');
const database = require('../../database');

const should = chai.should(); // eslint-disable-line

let noteID = null;

describe('Note Database Controller', () => {
  database.appusers.addUser('dbtest2', 'test');

  describe('Add Note', () => {
    it('it should create and return a note',
      () => database.notes.addNote('dbtest2', 'testtitle', 'testcontent', new Date())
        .then((res) => {
          res.should.be.an('object');
          noteID = res.id;
        })
        .catch((err) => {
          should.not.exist(err);
        }));
  });

  describe('Find Notes by Username', () => {
    it('it should return an array',
      () => database.notes.findNotesByUsername('dbtest2')
        .then((res) => {
          res.should.be.an('array');
        })
        .catch((err) => {
          should.not.exist(err);
        }));
    it('it should return an error if an invalid username is supplied',
      () => database.notes.findNotesByUsername('invalidusername')
        .then((res) => {
          res.should.not.be.an('array');
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Update Note', () => {
    it('it should update the note',
      () => database.notes.updateNoteByID(noteID, 'newtesttitle', 'newtestcontent', new Date())
        .then((res) => {
          res.should.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));
    it('it should return an error when supplied an invalid ID',
      () => database.notes.updateNoteByID(null, 'newtesttitle', 'newtestcontent', new Date())
        .then((res) => {
          res.should.not.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        }));
  });

  describe('Delete Note By ID', () => {
    it('it should delete a note',
      () => database.notes.deleteNoteByID(noteID)
        .then((res) => {
          res.should.equal(true);
        })
        .catch((err) => {
          should.not.exist(err);
        }));

    it('it should not delete a note when supplied an invalid ID',
      () => database.notes.deleteNoteByID(null)
        .then((res) => {
          res.should.not.equal(true);
        })
        .catch((err) => {
          should.exist(err);
        })
        .finally(() => {
          database.appusers.deleteUserByUsername('dbtest2');
        }));
  });
});
