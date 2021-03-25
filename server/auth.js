const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');
const errHandler = require('./err');

passport.use('signup', new localStrategy(async (username, password, done) => {
  try {
    const user = await db.appusers.addUser({username, password});
    return done(null, user);
  } catch (err) {
    errHandler(err);
    return done(err);
  }
}));


passport.use('login', new localStrategy(async (username, password, done) => {
  try {
    const user = await db.appusers.findUserByCredentials({username, password});

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    errHandler(err);
    return done(error);
  }
}));
