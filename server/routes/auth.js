const Router = require('@koa/router');
const passport = require('passport');
const db = require('../database');
const errHandler = require('../err');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', async (ctx) => {
  ctx.body = 'pong!';
});

authRouter.post('/login', async (ctx) => {
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
  console.log(username, password);

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
      errHandler(newUser);
      ctx.status = 500;
    }
  } else if (preExistingUser instanceof Error){
    ctx.status = 500;
  } else {
    ctx.status = 401;
    ctx.body = 'Username Taken!';
  }
});

// function testPromise() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function () {
//       resolve("test");
//     }, 10);
//   });
// }
//
// authRouter.get('/test', async (ctx) => {
//   // const value = await db.appusers.findUserByUsername('test');
//   const value = await testPromise();
//   ctx.status = 200;
//   console.log(value);
// });

module.exports = authRouter;
