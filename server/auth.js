const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  db.appusers
    .findUserByCredentials(username, password)
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
