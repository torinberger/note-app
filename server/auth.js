const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');

const errHandler = require('./err');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  db.appusers.findByUsername(username)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      errHandler(err);
      done(err);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  db.appusers.findUserByCredentials(username, password)
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }
      return done(null, user);
    })
    .catch((err) => {
      done(err);
    });
}));
