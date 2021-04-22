process.env.NODE_ENV = 'test';

// start server
require('../index');

// run tests
require('./api/auth.test.js');
require('./api/notes.test.js');

require('./database/appusers.test.js');
