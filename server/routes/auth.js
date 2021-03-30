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

authRouter.post('/signup', (ctx) => {
  return new Promise(function(resolve, reject) {
    console.log('HIT singup');
    db.appusers
      .findUserByUsername(username)
      .then((user) => {
        if (user.username) {
          db.appusers
            .addUser(username, password)
            .then((user) => {
              ctx.session.user = { username, password };
              ctx.status = 201;
              resolve();
            })
            .catch((err) => {
              errHandler(err);
              ctx.status = 500;
              reject(err);
            })
        } else {
          ctx.status = 401;
          ctx.body = 'Username Taken';
          reject();
        }
      })
      .catch((err) => {
        errHandler(err);
        ctx.status = 500;
        reject(err);
      })
  });
});

authRouter.get('/test', async (ctx) => {
  await db.appusers
    .findUsers()
    .then(() => {
      console.log('run');
      ctx.body = 'haha';
    })
    .catch(() => {
      ctx.status = 500;
    })
})

module.exports = authRouter;
