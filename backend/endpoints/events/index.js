const [listParams, listHandler] = require('./list');
const [timeSeriesParams, timeSeriesHandler] = require('./timeSeries');
const [createParams, createHandler] = require('./create');

module.exports = (fastify, ctx, done) => {
    fastify.get('/events/list', listParams, listHandler);
    fastify.get('/events/timeseries', timeSeriesParams, timeSeriesHandler);
    fastify.post('/events/create', createParams, createHandler);
    fastify.register(require('./edit'));
    done();
};