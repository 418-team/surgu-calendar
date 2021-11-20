const [listParams, listHandler] = require('./list');

module.exports = (fastify, ctx, done) => {
    fastify.get('/users/list', listParams, listHandler);
    done();
};