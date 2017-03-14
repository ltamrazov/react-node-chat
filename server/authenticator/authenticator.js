'use strict';

const expressJwt = require('express-jwt');
const socketioJwt = require('socketio-jwt');

function Middlewares (secret, exp, whitelisted) {
    const jwtOpts = {
        secret: secret,
        exp: exp
    };

    const socketJwtOpts = Object.assign({}, jwtOpts, {handshake: true});

    return {
        express: expressJwt(jwtOpts).unless({path: whitelisted}),
        socket: socketioJwt.authorize(socketJwtOpts)
    };
}

module.exports = Middlewares;
