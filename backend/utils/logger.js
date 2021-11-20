const pino = require('pino');

const logger = process.env.LOGS_TO_FILE ?
    pino({level: 'trace'}, pino.destination('/logs/server.log')) :
    pino({level: 'trace'});

module.exports = logger;