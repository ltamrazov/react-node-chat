'use strict';

/**
 * Wrapper for winston logger with configurations for this app.
 */

const winston = require('winston');
const config = require('config');

/**
 * Remove default console logger
 */
winston.remove(winston.transports.Console);

/**
 * Add own console logger with our config
 */
winston.add(winston.transports.Console, {
    timestamp: function () {
        // YYYY:DD:YY HH:MM:SS
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    level: config.get('logLevel'),
    colorize: true
});

module.exports = winston;
