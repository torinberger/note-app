const bcrypt = require('bcrypt');
const db = require('../connect');
const importQuery = require('./import');

const HASHSALTROUNDS = 10;

exports.findUserByUsername = function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUserByUsername', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [username], (dbErr, res) => {
          if (dbErr) {
            reject(dbErr);
          } else if (res.rows[0]) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  });
};

exports.findUserByCredentials = function findUserByCredentials(username, password) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUserByUsername', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [username], (dbErr, res) => {
          const dbUser = res.rows[0];
          if (dbErr) {
            reject(dbErr);
          } else {
            bcrypt.compare(password, dbUser.password, (compareErr, doesMatch) => {
              if (compareErr) {
                reject(compareErr);
              } else if (doesMatch) {
                resolve(true);
              } else {
                resolve(false);
              }
            });
          }
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
        importQuery('appusers/addUser', (importErr, query) => {
          if (importErr) {
            reject(importErr);
          } else {
            db.query(query, [username, hashedPassword], (dbErr) => {
              if (dbErr) {
                reject(dbErr);
              } else {
                resolve(true);
              }
            });
          }
        });
      }
    });
  });
};

exports.deleteUserByUsername = function deleteUser(username) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/deleteUser', (importErr, query) => {
      if (importErr) {
        reject(importErr);
      } else {
        db.query(query, [username], (dbErr) => {
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
