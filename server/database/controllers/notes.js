const db = require('./connect');

exports.findNotes = function () {
  importQuery('notes/findNotes', [], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.findNotesByUsername = function (username) {
  importQuery('notes/findNotesByUsername', [username], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.addNote = function (username, title, text) {
  importQuery('notes/addNote', [username, title, text], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.updateNote = function (id, newTitle, newText) {
  importQuery('notes/updateNote', [id, newTitle, newText], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.deleteNote = function (id) {
  importQuery('notes/deleteNote', [id], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};
