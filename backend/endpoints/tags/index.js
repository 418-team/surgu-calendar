const [listParams, listHandler] = require('./list');
const [createParams, createHandler] = require('./create');
const [editParams, editHandler] = require('./edit');
const [deleteParams, deleteHandler] = require('./delete');

module.exports = (fastify, ctx, done) => {
    fastify.get('/tags/list', listParams, listHandler);
    fastify.post('/tags/create', createParams, createHandler);
    fastify.put('/tags/:id', editParams, editHandler);
    fastify.delete('/tags/:id', deleteParams, deleteHandler);
    done();
};