const [authorizeParams, authorizeHandler] = require('./authorize');
const [refreshParams, refreshHandler] = require('./refresh');

module.exports = (fastify, ctx, done) => {
    fastify.post('/oauth/authorize', authorizeParams, authorizeHandler);
    fastify.post('/oauth/refresh', refreshParams, refreshHandler);
    done();
};