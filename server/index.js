require('dotenv').config();
const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const errHandler = require('./err');

const apiRouter = require('./routes');

const app = new Koa();

// session
app.keys = [process.env.SESSIONKEY];
app.use(session(app));

// body parser
app.use(bodyParser());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`${ctx.method} ${ctx.url} - ${ms}`); // eslint-ignore
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(`${ctx.method} ${ctx.url} - Error`);
    errHandler(err);
    ctx.status = 500;
  }
});

// routes
app
  .use(apiRouter.routes())
  .use(apiRouter.middleware());

app.listen(process.env.PORT);
console.log(`Listening on: ${process.env.PORT}`); // eslint-ignore

module.exports = app;
