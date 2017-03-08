'use strict';

/**
 * Error utility contains the global errors and the express middleware
 * for handling them.
 */

const errors = require('./errors.js');
const middleware = require('./express-handler.js');

/**
 * Predefined error types
 */
exports.types = errors.getTypes();

/**
 * Function for creating a generic error
 */
exports.createError = errors.createError;

/**
 * Express middleware for handling errors
 */
exports.handler = middleware;
