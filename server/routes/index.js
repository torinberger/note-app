const Router = require('@koa/router');
const authRouter = require('./auth');
const notesRouter = require('./notes');
const database = require('../database');
const errHandler = require('../err');

const router = new Router();

router.prefix('/api');

router.use(async (ctx, next) => {
  if (ctx.url.indexOf('auth') > 0) { // exempt auth routes for authentication testing
    await next();
  } else if (ctx.session.user) { // if authentication session avaliable
    // test authentication credentials
    const authenticatedUser =
      await database
        .appusers
        .findUserByCredentials(ctx.session.user.username, ctx.session.user.password);

    if (authenticatedUser) {
      await next(); // if user found, pass to next route
    } else if (authenticatedUser instanceof Error) {
      errHandler(err);
      ctx.status = 500;
    } else {
      ctx.status = 401;
      ctx.body = 'Invalid Authentication';
    }
  } else { // if no authentication session
    ctx.status = 401;
    ctx.body = 'Missing Authentication';
  }
});

router.get('/ping', async (ctx) => {
  ctx.body = 'pong!';
});

function testPromise() {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve("test");
    }, 10);
  });
}

router.get('/test', async (ctx) => {
  // const value = await db.appusers.findUserByUsername('test');
  const value = await testPromise();
  ctx.status = 200;
  console.log(value);
});

router
  .use(authRouter.routes())
  .use(authRouter.middleware());

router
  .use(notesRouter.routes())
  .use(notesRouter.middleware());

module.exports = router;
