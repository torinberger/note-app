const Router = require('@koa/router');
const database = require('../database');
const errHandler = require('../err');

require('../auth');

const notesRouter = new Router();

notesRouter.prefix('/notes');

notesRouter.get('/ping', (ctx) => {
  ctx.status = 200;
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
