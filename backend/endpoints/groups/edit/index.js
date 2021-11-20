const [editParams, editHandler] = require('./edit');
const [infoParams, infoHandler] = require('./info');
const [userAddParams, userAddHandler] = require('./userAdd');
const [userDeleteParams, userDeleteHandler] = require('./userDelete');

module.exports = (fastify, ctx, done) => {
    fastify.get('/groups/:id', infoParams, infoHandler);
    fastify.put('/groups/:id', editParams, editHandler);
    fastify.post('/groups/:id/users/:user_id', userAddParams, userAddHandler);
    fastify.delete('/groups/:id/users/:user_id', userDeleteParams, userDeleteHandler);
    done();
};