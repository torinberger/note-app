const fs = require('fs');

const errorLogLocation = './error.log';

module.exports = async function main(errorToLog) {
  console.err(errorToLog);
  fs.readFile(errorLogLocation, (readErr, buffer) => {
    if (readErr) {
      throw readErr;
    } else {
      // eslint-disable
      fs.writeFile(
        errorLogLocation,
        `${String(buffer) + errorToLog}\n`,
        (writeErr, res) => {
        // eslint-enable
          if (writeErr) {
            throw writeErr;
          } else {
            return res;
          }
        },
      );
    }
  });
};
