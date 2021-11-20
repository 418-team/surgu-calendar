const [listParams, listHandler] = require('./list');
const [createParams, createHandler] = require('./create');

module.exports = (fastify, ctx, done) => {
    fastify.get('/events/list', listParams, listHandler);
    fastify.post('/events/create', createParams, createHandler);
    fastify.register(require('./edit'));
    done();
};