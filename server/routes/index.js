const Router = require('@koa/router');
const authRouter = require('./auth');
const notesRouter = require('./notes');
const database = require('../database');
const errHandler = require('../err');

const router = new Router();

router.prefix('/api');

router.use(async (ctx, next) => {
  if (ctx.url.indexOf('auth') > 0) { // exempt auth routes for authentication testing
    next();
  } else if (ctx.session.auth) { // if authentication session avaliable
    // test authentication credentials
    database
      .appusers
      .findUserByCredentials(ctx.session.auth.username, ctx.session.auth.password)
      .then((user) => {
        if (user) {
          next(); // if user found, pass to next route
        } else {
          ctx.status = 401;
          ctx.body = 'Invalid Authentication';
        }
      })
      .catch((err) => {
        errHandler(err);
        ctx.status = 500;
      });
  } else { // if no authentication session
    ctx.status = 401;
    ctx.body = 'Missing Authentication';
  }
});

router.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

router
  .use(authRouter.routes())
  .use(authRouter.middleware());

router
  .use(notesRouter.routes())
  .use(notesRouter.middleware());

module.exports = router;
