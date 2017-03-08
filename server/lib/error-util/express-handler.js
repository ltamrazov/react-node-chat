'use strict';

/**
 * Middleware for handling errors in express. Checks if the error is safeError
 * logs, and sends appropriate response.
 */

const logger = require('../logger');

module.exports = ErrorHandler;

function ErrorHandler (opts) {
    return function middleware (err, req, res, next) {
        if (!err) {
            // if no error, call next middleware
            return next();
        }

        // safe errors means it was created by us and its client safe. It
        // was also already logged. So just send.
        if (err.safeError) {
            return res.status(err.status).send(err.message);
        }

        // message consists of error message and the stack.
        let msg = err.message || 'Error: Message not provided';
        if (err.stack) {
            msg += `\n${err.stack}`;
        }

        logger.error(msg);

        // since this was an unexpected error, we send default message and
        // status (since actual might not be client safe)
        return res.status(500).send('Sorry, something went wrong...');
    };
}
