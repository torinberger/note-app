require('dotenv').config();
const db = require('./connect');
const importQuery = require('./controllers/import');

importQuery('resetdb', (importErr, query) => {
  if (importErr) {
    throw importErr;
  } else {
    db.query(query, (dbErr) => {
      if (dbErr) {
        throw dbErr;
      } else {
        console.log('Reset complete, old tables dropped, new tables created!');
        process.exit();
      }
    });
  }
});
