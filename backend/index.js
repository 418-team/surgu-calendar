const logger = require('./utils/logger');
const fastify = require('fastify')({logger});
const setupSwagger = require('./utils/swagger');
setupSwagger(fastify);

const pgConnector = require('./utils/pgConnector');
const {AuthCheck} = require('./utils/security');
const {syncGoogleCalendar} = require('./utils/google');
pgConnector.initDB();

fastify.register(require('fastify-cors'), {
    origin: (origin, callback) => {
        callback(null, true);
    }
});

fastify.addContentTypeParser('application/json', {parseAs: 'string'}, function (req, body, done) {
    try {
        const json = JSON.parse(body);
        done(null, json);
    } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
});

fastify.register(require('fastify-formbody'));

fastify.addHook('preHandler', (request, reply, done) => {
    request.pg = pgConnector;
    done();
});

fastify.get('/', function (request, reply) {
    console.log(request.pg);
    reply.send({hello: 'world'});
});

fastify.addHook('preHandler', AuthCheck);
fastify.register(require('./endpoints/oauth'));
// fastify.register(require('./endpoints/account'));
fastify.register(require('./endpoints/users'));
fastify.register(require('./endpoints/events'));
fastify.register(require('./endpoints/tags'));
fastify.register(require('./endpoints/groups'));

// syncGoogleCalendar('9j7f353ron36pmjrbvovmqgans@group.calendar.google.com', 1);

const start = async () => {
    try {
        await fastify.listen(80, '0.0.0.0');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();