'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');
const errorTypes = require('../lib/error-util').types;
const secret = config.get('jwt.secret');
const exp = config.get('jwt.exp');

function login (req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
        return next(errorTypes.unauthorized('Username or password are invalid.'));
    }

    let token = jwt.sign({username, password}, secret, {expiresIn: exp});

    return res.send({token: token, username: username});
}

function logout (req, res, next) {
    return res.end();
}

module.exports = {
    login: login,
    logout: logout
};
