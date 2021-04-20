require('dotenv').config();
const db = require('./connect');
const importQuery = require('./controllers/import');

importQuery('setup', (query) => {
  db.query(query, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log('Setup complete, tables created!');
      process.exit();
    }
  });
});
