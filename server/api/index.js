const Router = require('@koa/router');
const authRouter = require('./auth');

const router = new Router();

router.prefix('/api');

router.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

router
  .use(authRouter.routes())
  .use(authRouter.middleware());

module.exports = router;
