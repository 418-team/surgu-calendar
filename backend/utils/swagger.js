const SwaggerPlugin = require('fastify-swagger');

function swagger(fastify) {
    const config = {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'SurEnt API',
                version: process.env.VERSION || 'local'
            },
            host: process.env.NODE_ENV === 'staging' ? 'backend.staging.surent.418.one' :
                process.env.NODE_ENV === 'production' ? 'backend.surent.418.one' :
                    // 'localhost:14400',
                    '94.41.65.26',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {name: 'oauth', description: 'Методы для авторизации OAuth2'},
                {name: 'events', description: 'Работа с событиями'},
                {name: 'tags', description: 'Работа с тегами для событий'},
                {name: 'groups', description: 'Работа с группами пользователей'}
            ],
            securityDefinitions: {
                OAuth2: {
                    type: 'oauth2',
                    flow: 'password',
                    tokenUrl: '/oauth/authorize',
                    refreshUrl: '/oauth/refresh'
                }
            }
        }
    };


    fastify.register(SwaggerPlugin, config);

    fastify.ready(err => {
        if (err) throw err;
        fastify.swagger();
    });
}

module.exports = swagger;