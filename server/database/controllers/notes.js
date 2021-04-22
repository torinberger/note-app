const db = require('../connect');
const importQuery = require('./import');

exports.findNotesByUsername = function findNotesByNotename(username) {
  return new Promise((resolve, reject) => {
    importQuery('notes/findNotesByUsername', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [username], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.rows);
          }
        });
      }
    });
  });
};

exports.addNote = function addNote(userusername, title, content, lastUpdate) {
  return new Promise((resolve, reject) => {
    importQuery('notes/addNote', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [userusername, title, content, lastUpdate], (dbErr, res) => {
          if (dbErr) {
            reject(dbErr);
          } else {
            resolve(res.rows[0]);
          }
        });
      }
    });
  });
};

exports.deleteNoteByID = function deleteNote(noteID) {
  return new Promise((resolve, reject) => {
    importQuery('notes/deleteNote', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [noteID], (dbErr) => {
          if (dbErr) {
            reject(dbErr);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
};

exports.updateNote = function updateNote(id, newTitle, newContent, lastUpdate) {
  return new Promise((resolve, reject) => {
    importQuery('notes/updateNote', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [id, newTitle, newContent, lastUpdate], (dbErr) => {
          if (dbErr) {
            reject(dbErr);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
};
