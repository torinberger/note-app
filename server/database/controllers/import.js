const fs = require('fs');

module.exports = async function main(filepath, callback) {
  fs.readFile(`./queries/${filepath}.sql`, (err, buffer) => {
    if (err) {
      throw err;
    } else {
      callback(String(buffer).split('\n')[0]);
    }
  });
};
