
const Router = require('@koa/router');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', (ctx, next) => {
  ctx.body = 'pong!';
});

module.exports = authRouter;
