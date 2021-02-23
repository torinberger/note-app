const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require('./database');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  // FIND USER WITH PG
  .then((user) => {
    if (!user) return done(null, false);
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => { return done(err); });
}));
