const db = require('../connect');
const importQuery = require('./import');
const handleErr = require('../../err');

exports.findUsers = async function () {
  return new Promise(function(resolve, reject) {
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

exports.findUserByUsername = async function (username) {
  return new Promise(function(resolve, reject) {
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

exports.findUserByCredentials = async function (username, password) {
  return new Promise(function(resolve, reject) {
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

exports.addUser = async function (username, password) {
  return new Promise(function(resolve, reject) {
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

exports.deleteUser = async function (username, password) {
  return new Promise(function(resolve, reject) {
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
