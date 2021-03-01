const db = require('../connect');
const importQuery = require('./import');
const handleErr = require('../../err');

exports.findUsers = async function findUsers() {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUsers', [], (query) => {
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

exports.findUserByUsername = async function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUser', [username], (query) => {
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

exports.findUserByCredentials = async function findUserByCredentials(username, password) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/findUserByCredentials', [username, password], (query) => {
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

exports.addUser = async function addUser(username, password) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/addUser', [username, password], (query) => {
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

exports.deleteUser = async function deleteUser(username, password) {
  return new Promise((resolve, reject) => {
    importQuery('appusers/deleteUser', [username, password], (query) => {
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
