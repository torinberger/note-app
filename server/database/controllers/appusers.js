const bcrypt = require('bcrypt');
const db = require('../connect');
const importQuery = require('./import');

exports.findUsers = async function findUsers() {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUsers', [], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.findUserByUsername = async function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUser', [username], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.findUserByCredentials = async function findUserByCredentials(username, password) {
  // hash password before comparing to database
  password = bcrypt.hash(password, 20);
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUserByCredentials', [username, password], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.addUser = async function addUser(username, password) {
  return new Promise((resolve, reject) => {
    // hash password before saving to database
    password = bcrypt.hash(password, 20);
    importQuery('appusers/addUser', [username, password], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};

exports.deleteUser = async function deleteUser(username, password) {
  // has password before saving to database
  password = bcrypt.hash(password, 20);
  return new Promise((resolve, reject) => {
    importQuery('appusers/deleteUser', [username, password], (query) => {
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};
