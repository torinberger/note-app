const fs = require('fs');

module.exports = async function main(filepath, callback) {
  fs.readFile(`${__dirname}/queries/${filepath}.sql`, (err, buffer) => {
    if (err) {
      callback(err);
    } else {
      callback(null, String(buffer));
    }
  });
};
