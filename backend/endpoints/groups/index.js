const [listParams, listHandler] = require('./list');
const [createParams, createHandler] = require('./create');

module.exports = (fastify, ctx, done) => {
    fastify.get('/groups/list', listParams, listHandler);
    fastify.post('/groups/create', createParams, createHandler);
    fastify.register(require('./edit'));
    done();
};