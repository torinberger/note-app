const Router = require('@koa/router');
const db = require('../database');
const errHandler = require('../err');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', async (ctx) => {
  ctx.body = 'pong!';
});

authRouter.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  const preExistingUser = await db.appusers.findUserByCredentials(username, password);
  if (preExistingUser.username && preExistingUser.password) {
    ctx.session.user = { username, password };
    ctx.status = 200;
  } else if (preExistingUser instanceof Error) {
    errHandler(preExistingUser);
    ctx.status = 500;
  } else {
    ctx.status = 401;
    ctx.body = 'Username Taken!';
  }
});

authRouter.post('/signup', async (ctx) => {
  const { username, password } = ctx.request.body;
  const preExistingUser = await db.appusers.findUserByUsername(username);
  if (preExistingUser === undefined) {
    const newUser = await db.appusers.addUser(username, password);
    if (newUser.username && newUser.password) {
      ctx.session.user = { username, password };
      ctx.status = 201;
    } else {
      errHandler(newUser);
      ctx.status = 500;
    }
  } else if (preExistingUser instanceof Error) {
    errHandler(preExistingUser);
    ctx.status = 500;
  } else {
    ctx.status = 401;
    ctx.body = 'Username Taken!';
  }
});

module.exports = authRouter;
