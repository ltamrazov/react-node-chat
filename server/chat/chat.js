'use strict';

const socketio = require('socket.io');
const authenticator = require('../authenticator');
const logger = require('../lib/logger');

module.exports = function (server) {
    /**
     * Initialize socket io with given server
     */
    let io = socketio.listen(server);

    // keep track of users and rooms
    const users = {};
    const rooms = {};

    io.use(function (packet, next) {
        logger.info(`Connection attempt...`);
        next();
    });

    /**
     * Authentication
     */
    io.use(authenticator.socket);

    io.on('connection', function (socket) {
        let username = socket.decoded_token.username;
        users[username] = {socket};

        logger.info(`${username} connected`);

        updateUsers();

        socket.on('disconnect', function () {
            delete users[username];
        });
    });

    function updateUsers () {
        io.emit('users', Object.keys(users));
    }
};
