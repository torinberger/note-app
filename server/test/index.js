process.env.NODE_ENV = 'test';

// start server
require('../index');

// run tests
require('./database/appusers.test.js');
require('./database/notes.test.js');

require('./api/auth.test.js');
require('./api/notes.test.js');
