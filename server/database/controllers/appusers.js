const bcrypt = require('bcrypt');
const db = require('../connect');
const importQuery = require('./import');

const HASHSALTROUNDS = 10;

exports.findUsers = function findUsers() {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUsers', (query) => {
      db.query(query, [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  });
};

exports.findUserByUsername = function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUserByUsername', (query) => {
      db.query(query, [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.findUserByCredentials = function findUserByCredentials(username, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, HASHSALTROUNDS, (hashErr, hashedPassword) => {
      if (hashErr) {
        reject(hashErr);
      } else {
        importQuery('appusers/findUserByCredentials', (query) => {
          db.query(query, [username, hashedPassword], (dbErr, res) => {
            if (dbErr) {
              reject(dbErr);
            } else {
              resolve(res.rows[0]);
            }
          });
        });
      }
    });
  });
};

exports.addUser = function addUser(username, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, HASHSALTROUNDS, (hashErr, hashedPassword) => {
      if (hashErr) {
        reject(hashErr);
      } else {
        importQuery('appusers/addUser', (query) => {
          db.query(query, [username, hashedPassword], (dbErr, res) => {
            if (dbErr) {
              reject(dbErr);
            } else {
              resolve(res.rows[0]);
            }
          });
        });
      }
    });
  });
};

exports.deleteUser = function deleteUser(username, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, HASHSALTROUNDS, (hashErr, hashedPassword) => {
      if (hashErr) {
        reject(hashErr);
      } else {
        importQuery('appusers/deleteUser', (query) => {
          db.query(query, [username, hashedPassword], (dbErr) => {
            if (dbErr) {
              reject(dbErr);
            } else {
              resolve(true);
            }
          });
        });
      }
    });
  });
};
