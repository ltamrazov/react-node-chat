'use strict';

const config = require('config');
const whitelisted = require('./whitelist.json');

let secret = config.get('jwt.secret');
let exp = config.get('jwt.exp');

module.exports = require('./authenticator.js')(secret, exp, whitelisted);
