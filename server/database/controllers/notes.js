const db = require('../connect');
const importQuery = require('./import');

exports.findNotes = function findNotes() {
  return new Promise((resolve, reject) => {
    importQuery('notes/findNotes', [], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  });
};

exports.findNotesByUsername = function findNotesByUsername(username) {
  return new Promise((resolve, reject) => {
    importQuery('notes/findNotesByUsername', [username], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.addNote = function addNote(username, title, text, lastUpdate) {
  return new Promise((resolve, reject) => {
    importQuery('notes/addNote', [username, title, text, lastUpdate], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.updateNote = function updateNote(id, newTitle, newContent, lastUpdate) {
  return new Promise((resolve, reject) => {
    importQuery('notes/updateNote', [id, newTitle, newContent, lastUpdate], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.deleteNote = function deleteNote(id) {
  return new Promise((resolve, reject) => {
    importQuery('notes/deleteNote', [id], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};
