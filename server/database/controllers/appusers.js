const bcrypt = require('bcrypt');
const db = require('../connect');
const importQuery = require('./import');

exports.findUsers = async function findUsers() {
  return new Promise(async (resolve, reject) => {
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

exports.findUserByUsername = async function findUserByUsername(username) {
  return new Promise(async (resolve, reject) => {
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

exports.findUserByCredentials = async function findUserByCredentials(username, password) {
  // hash password before comparing to database
  const hashedPassword = await bcrypt.hash(password, 20);
  return new Promise(async (resolve, reject) => {
    importQuery('appusers/findUserByCredentials', (query) => {
      db.query(query, [username, hashedPassword], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.addUser = async function addUser(username, password) {
  return new Promise(async (resolve, reject) => {
    // hash password before saving to database
    const hashedPassword = await bcrypt.hash(String(password), 20);
    console.log('hashed password:', hashedPassword);
    importQuery('appusers/addUser', (query) => {
      db.query(query, [username, hashedPassword], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};

exports.deleteUser = async function deleteUser(username, password) {
  // has password before saving to database
  const hashedPassword = await bcrypt.hash(password, 20);
  return new Promise(async (resolve, reject) => {
    importQuery('appusers/deleteUser', (query) => {
      db.query(query, [username, hashedPassword], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  });
};
