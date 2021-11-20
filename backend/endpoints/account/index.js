const [registerParams, registerHandler] = require('./register');

module.exports = (fastify, ctx, done) => {
    fastify.post('/account/register', registerParams, registerHandler);
    done();
};