require('dotenv').config();
const db = require('./connect');
const importQuery = require('./controllers/import');

importQuery('resetdb', (query) => {
  db.query(query, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Reset complete, old tables dropped, new tables created!');
      process.exit();
    }
  });
});
