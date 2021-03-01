const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');

const handleErr = require('./err');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  db.appusers.findByUsername(username)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      handleErr(err);
      done(err, null);
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
      handleErr(err);
      done(err);
    });
}));

passport.use(new LocalStrategy((username, password, done) => {
  db.appusers.findUserByCredentials(username, password)
    .then((user) => {
      if (!user) return done(null, false);
      if (password === user.password) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      handleErr(err);
      return done(err);
    });
}));
