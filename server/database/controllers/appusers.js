const db = require('../connect');
const importQuery = require('./import');

exports.findUsers = function () {
  importQuery('appusers/findUsers', [], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.findUserByUsername = function (username) {
  importQuery('appusers/findUser', [username], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.findUserByCredentials = function (username, password) {
  importQuery('appusers/findUserByCredentials', [username, password], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.addUser = function (username, password) {
  importQuery('appusers/addUser', [username, password], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};

exports.deleteUser = function (username, password) {
  importQuery('appusers/deleteUser', [username, password], (query) => {
    db.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(err, res);
      }
    });
  });
};
