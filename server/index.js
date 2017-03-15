'use strict';

/**
 * Init http server
 */
const server = require('./server.js');

/**
 * Inint and attach socket.io server
 */
require('./chat')(server);

/**
 * Export http server
 */
module.exports = server;
