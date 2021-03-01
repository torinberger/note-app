const db = require('./connect');
const handleErr = require('../../err');

exports.findNotes = async function () {
  return new Promise(function(resolve, reject) {
    importQuery('notes/findNotes', [], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          handleErr(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.findNotesByUsername = async function (username) {
  return new Promise(function(resolve, reject) {
    importQuery('notes/findNotesByUsername', [username], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          handleErr(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.addNote = async function (username, title, text) {
  return new Promise(function(resolve, reject) {
    importQuery('notes/addNote', [username, title, text], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          handleErr(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.updateNote = async function (id, newTitle, newText) {
  return new Promise(function(resolve, reject) {
    importQuery('notes/updateNote', [id, newTitle, newText], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          handleErr(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.deleteNote = async function (id) {
  return new Promise(function(resolve, reject) {
    importQuery('notes/deleteNote', [id], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          handleErr(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};
