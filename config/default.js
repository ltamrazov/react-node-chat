'use strict';

const env = process.env;

module.exports = {
    env: env.NODE_ENV || 'dev',
    logLevel: env.LOG_LEVEL || 'info',
    jwt: {
        secret: env.JWT_SECRET || 'test',
        exp: env.JWT_EXP || 1000 * 60 * 24 // one day
    }
};
