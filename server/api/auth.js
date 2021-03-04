const Router = require('@koa/router');
const database = require('../database');
const errHandler = require('../err');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

authRouter.post('/login', (ctx) => {
  const { username, password } = ctx.request.body;
  database.appusers.findUserByCredentials(username, password)
    .then(() => {
      ctx.status = 200;
    })
    .catch(errHandler);
});

authRouter.post('/register', (ctx) => {
  const { username, password } = ctx.request.body;
  database.appusers.findUserByUsername(username)
    .then((userByUsername) => {
      if (!userByUsername) {
        database.appusers.addUser(username, password)
          .then(() => {
            ctx.status = 201;
          })
          .catch(errHandler);
      } else {
        ctx.status = 403;
      }
    })
    .catch(errHandler);
});

module.exports = authRouter;
