'use strict';

/**
 * App server. Configures the server with all the middleware and mounts
 * the global router.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const expressLogger = require('./lib/express-logger');
const errorHandler = require('./lib/error-util').handler;
const router = require('./router');
const authenticator = require('./authenticator');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const STATIC = '../client/dist';

/**
 * Secure the server
 */
app.use(helmet());

/**
 * Logging middleware will log every request
 */
app.use(expressLogger());

/**
 * Point to static folder
 */
app.use(express.static(path.join(__dirname, STATIC)));

/**
 * Authentication
 */
app.use(authenticator.express);
io.use(authenticator.socket);

/**
 * Parse body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/**
 * Mount global router with all routes
 */
app.use('/', router);

/**
 * Catch and handle all errors
 */
app.use(errorHandler());

/**
 * Export app
 */
module.exports = server;
