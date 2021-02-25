const db = require('../connect');
const importQuery = require('./import');

exports.findUsers = function () {
  importQuery('appusers/findUsers', (query) => {
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
  // body...
};

exports.findUserByID = function (id) {
  // body...
};

exports.findUserByCredentials = function (username, password) {
  // body...
};

exports.addUser = function (username, password) {
  // body...
};

exports.deleteUser = function (id) {
  // body...
};
