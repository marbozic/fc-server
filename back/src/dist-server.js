'use strict';

console.log('+++++++++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++++++++');
console.log('++++++++++++++++++++++++++++++++++++|F|I|R|E|_|C|L|O|U|D|++++++++++++++++++++++++++++++++++++');
console.log('+++++++++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++++++++');
console.log('++++++++++++++++++++++++++++++++++++|A|P|P|_|_|S|T|A|R|T|++++++++++++++++++++++++++++++++++++');
console.log('+++++++++++++++++++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+++++++++++++++++++++++++++++++++++++');
console.log('\n\n');

const fs = require('fs');

const Hapi = require('hapi');
const Inert = require('inert');

const logger = require('./app/core/logger');
const hashAuth = require('./app/core/hash-auth-server-plugin');
const config = require('./config/config');
require('./config/db');

const APP_ROUTES = require("./app/app.routes");
require("./app/app.schedule");

const server = new Hapi.Server({
    connections: {
        routes: {
            timeout: {
                server: 1000 * 60 * 5, // 5 min
                socket: 1000 * 60 * 8 // 8 min
            }
        }
    }
});

const start = async() => {
    logger.info('Fire Cloud server starting...');

    await server.register(Inert);

    server.connection({port: config.server.port, routes: {cors: true}});

    if (fs.existsSync(config.server.https.key) && fs.existsSync(config.server.https.cert)) {
        const tls = {
            key: fs.readFileSync(config.server.https.key),
            cert: fs.readFileSync(config.server.https.cert)
        };

        server.connection({port: config.server.https.port, tls});
    } else {
        console.log(`SSL certificate didn't found by path: ${config.server.https.key}`);
    }

    server.route(APP_ROUTES);

    await server.register(hashAuth);
    server.auth.strategy('simple', 'hash');
    server.auth.default('simple');

    await server.start();

    if (server.info) {
    logger.info('Server is listening: ' + server.info.uri);
    } else if (server.connections) {
        server.connections.forEach(connection => {
            logger.info('Server is listening: ' + connection.info.uri);
        });
    } else {
        logger.info('Server started');
    }
};

start();

module.exports = server;
