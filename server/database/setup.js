const db = require('./connect');
const importQuery = require('./controllers/import');

importQuery('../setup.sql', [], (query) => {
  db.query(query, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log(err, res); // eslint-ignore
    }
  });
});
