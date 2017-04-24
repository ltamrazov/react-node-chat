'use strict';

const socketio = require('socket.io');
const uuid = require('uuid/v4');
const authenticator = require('../authenticator');
const logger = require('../lib/logger');

module.exports = function (server) {
    /**
     * Initialize socket io with given server
     */
    let io = socketio.listen(server);

    // keep track of users and rooms
    const users = {};

    io.use(function (packet, next) {
        logger.info(`Connection attempt...`);
        next();
    });

    /**
     * Authentication
     */
    io.use(authenticator.socket);

    /**
     * New connection. This will only open if user is authenticated
     */
    io.on('connection', function (socket) {
        // get username from token and store socket
        let username = socket.decoded_token.username;
        users[username] = {socket: socket, rooms: {}};

        logger.info(`${username} connected`);

        // emit that new user is online
        updateUsers();

        // perform cleanup when user leaves
        socket.on('disconnect', function () {
            // need to let all the rooms the user has joined know
            for (let room in socket.rooms) {
                socket.broadcast.to(room).emit('user_left', {username, room});
            }
            delete users[username];
        });

        // request for room with username of the requesting user
        socket.on('chat_request', function (targetUser) {
            if (!users[targetUser]) {
                return;
            }

            // lookup if we already have a room with this user and
            // create new room if we don't
            let roomId = roomLookup(username, targetUser) || newRoom(username, targetUser);

            // emit that a room has been made ready, with roomid and members
            io.in(roomId).emit('chat_ready', roomId, [username, targetUser]);
        });

        // new message. data = {roomId, msg, from}
        socket.on('new_msg', function (data) {
            io.in(data.roomId).emit('new_msg', data);
        });

        // someone in our room has left, clean up rooms.
        socket.on('user_left', function (user) {
            delete users[username].rooms[user];
        });
    });

    function updateUsers () {
        io.emit('users', Object.keys(users));
    }

    function newRoom (user1, user2) {
        let roomId = uuid();
        users[user1].socket.join(roomId);
        users[user2].socket.join(roomId);
        users[user1].rooms[user2] = roomId;
        users[user2].rooms[user1] = roomId;
        return roomId;
    }

    function roomLookup (user1, user2) {
        return users[user1].rooms[user2];
    }
};
