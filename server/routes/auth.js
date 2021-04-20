const Router = require('@koa/router');
const passport = require('passport');
const db = require('../database');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

authRouter.post('/login', (ctx) => {
  db.appusers
    .findUserByCredentials(username, password)
    .then((user) => {
      if (user) {
        ctx.session.user = { username, password };
        ctx.status = 200;
      } else {
        ctx.status = 401;
        ctx.body = 'Invalid Authentication';
      }
    })
    .catch((err) => {
      errHandler(err);
      ctx.status = 500;
    })
});

authRouter.post('/signup', async (ctx) => {
  const { username, password } = ctx.request.body;

  console.log('HIT signup');
  const preExistingUser = await db.appusers.findUserByUsername(username);
  console.log('preExistingUser');
  console.log(preExistingUser);
  if (preExistingUser === undefined) {
    const newUser = await db.appusers.addUser(username, password);
    if (newUser.username && newUser.password) {
      ctx.session.user = { username, password };
      ctx.status = 201;
    } else {
      errHandler(err);
      ctx.status = 500;
    }
  } else if (preExistingUser instanceof Error){
    ctx.status = 401;
    ctx.body = 'Username Taken';
  }
});

module.exports = authRouter;
