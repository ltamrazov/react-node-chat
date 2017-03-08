'use strict';

/**
 * Middleware for logging requests
 */

const logger = require('../logger');

/**
 * Express logger returns a middleware that will log every requests
 * Log formatt is [METHOD]:[ROUTE]
 *
 * @param {Object} opts optional configuration (not yet implemented)
 */
function ExpressLogger (opts) {
    /**
     * Returns loggin middleware
     * @param  {Object}   req  Express request object
     * @param  {Object}   res  Express response object
     * @param  {Function} next Express next function
     * @return {Function}        Express middleware
     */
    return function middleware (req, res, next) {
        logger.info(`${req.method}: ${req.originalUrl}`);
        next();
    };
};

module.exports = ExpressLogger;
