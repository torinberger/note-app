const fs = require('fs');

module.exports = async function (filepath, callback) {
  fs.readFile(`./queries/${filepath}.sql`, function(err, buffer) {
    if (err) {
      throw err;
    } else {
      callback(String(buffer).split('\n')[0]);
    }
  });
};
