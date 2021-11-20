const [editParams, editHandler] = require('./edit');
const [infoParams, infoHandler] = require('./info');

module.exports = (fastify, ctx, done) => {
    fastify.get('/events/:id', infoParams, infoHandler);
    fastify.put('/events/:id', editParams, editHandler);
    done();
};