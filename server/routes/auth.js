const Router = require('@koa/router');
const passport = require('passport');

const authRouter = new Router();

authRouter.prefix('/auth');

authRouter.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

authRouter.post('/login', (ctx) => {
  passport.authenticate('login', async (err, user) => {
    if (err) {
      ctx.status = 500;
    } else if (!user) {
      ctx.status = 401;
    } else {
      ctx.session.auth = user;
      ctx.status = 200;
    }
  });
});

authRouter.post('/signup', (ctx) => {
  console.log('auth path hit');
  passport.authenticate('signup', async (err, user) => {
    console.log('passport complete');
    if (err) {
      ctx.status = 500;
    } else if (!user) {
      ctx.status = 401;
    } else {
      ctx.session.auth = user;
      ctx.status = 201;
    }
  });
});

module.exports = authRouter;
