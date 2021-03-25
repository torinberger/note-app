const Router = require('@koa/router');
const passport = require('passport');
const database = require('../database');
const errHandler = require('../err');

require('../auth');

const notesRouter = new Router();

notesRouter.prefix('/notes');

notesRouter.use((ctx, next) => {
  if (ctx.session.auth) {
    database
      .appusers
      .findUserByCredentials(ctx.session.auth.username, ctx.session.auth.password)
      .then((user) => {
        if (user) {
          next();
        } else {
          ctx.status = 401;
          ctx.body = 'Invalid Authentication';
        }
      })
      .catch((err) => {
        errHandler(err);
        ctx.status = 500;
      })
  } else {
    ctx.status = 401;
    ctx.body = 'Missing Authentication';
  }
})

notesRouter.get('/ping', (ctx) => {
  ctx.body = 'pong!';
});

notesRouter.post('/get', (ctx) => {
  const { userusername } = ctx.request.body;
  database.notes.findNotesByUsername(userusername)
    .then((notes) => {
      ctx.status = 200;
      ctx.body = notes;
    })
    .catch(errHandler);
  ctx.body = 'pong!';
});

notesRouter.post('/add', (ctx) => {
  const { userusername, title, content } = ctx.request.body;
  database.notes.addNote(userusername, title, content, new Date())
    .then((note) => {
      ctx.status = 201;
      ctx.body = note;
    })
    .catch(errHandler);
  ctx.body = 'pong!';
});

notesRouter.post('/update', (ctx) => {
  const { id, title, content } = ctx.request.body;
  database.notes.updateNote(id, title, content, new Date())
    .then((note) => {
      ctx.status = 200;
      ctx.body = note;
    })
    .catch(errHandler);
  ctx.body = 'pong!';
});

module.exports = notesRouter;
