'use strict';
/**
 * App server. Configures the server with all the middleware and mounts
 * the global router.
 */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const expressLogger = require('./lib/express-logger');
const errorHandler = require('./lib/error-util').handler;
const router = require('./lib/router');

const staticPath = '../client';

let app = express();

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
app.use(express.static(path.join(__dirname, staticPath)));

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
module.exports = app;
