const {Pool} = require('pg');
const checkAdmin = require('./checkAdmin');
const logger = require('./logger');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 8000,
    idleTimeoutMillis: 8000,
    max: 20
});

pool.on('error', (err) => {
    logger.error('An idle client has experienced an error', err.stack);
});

function initDB() {
    checkAdmin(query)
        .then(() => logger.info('База данных готова к использованию'))
        .catch(err => {
            logger.fatal(`Произошла ошибка при проверке аккаунта администратора
                        Информация об ошибке: ${err}`);
            process.exit(1);
        });
}

async function query(text, params) {
    try {
        return await pool.query(text, params);
    } catch (e) {
        console.error('query error', e);
        return {rows: 'err'};
    }
}

// module.exports = function (fastify, options, done) {
//     initDB()
//     console.log('plugin')
//     fastify.addHook('preHandler', (request, reply, done) => {
//         request.pg = {query}
//         done()
//     })
//
//     done()
// }

module.exports = {initDB, query}