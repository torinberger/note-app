require('dotenv').config();
const Koa = require('koa');
const router = require('@koa/router');
const session = require('koa-session');
const passport = require('koa-passport');

const app = new Koa();

// session
app.keys = [process.env.SESSIONKEY];
app.use(session(app))

// body parser
app.use(bodyParser());

// auth
require('./auth');
app.use(passport.initialize);
app.use(passport.session());

// routes
app.use()

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.listen(process.env.PORT);
console.log(`Listening on: ${process.env.PORT}`);
