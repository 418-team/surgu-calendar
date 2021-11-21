const [listParams, listHandler] = require('./list');
const [googleCalendarParams, googleCalendarHandler] = require('./googleCalendar');
const [createParams, createHandler] = require('./create');

module.exports = (fastify, ctx, done) => {
    fastify.get('/users/list', listParams, listHandler);
    fastify.post('/users/create', createParams, createHandler);
    fastify.put('/users/:id/google-calendar', googleCalendarParams, googleCalendarHandler);
    done();
};