'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const http = require('http');
const jwt = require('jsonwebtoken');
const config = require('config');
const ioClient = require('socket.io-client');
const chat = require('./chat.js');
const TEST_PORT = 9494;

describe('Socket.io server', function () {
    let server;
    let url;
    let socket;
    let username;

    before(function () {
        username = 'testname';
        url = 'http://localhost:' + TEST_PORT;
        server = http.createServer();
        chat(server);
        server.listen(TEST_PORT);
    });

    afterEach(() => {
        if (socket) socket.disconnect();
    });

    it('should block a connection without an auth token', function (done) {
        socket = ioClient.connect(url, {multiplex: false});
        socket.on('connect', function () {
            return done(new Error('Opened unauthorized connection'));
        });

        socket.on('error', function (err) {
            err.type.should.equal('UnauthorizedError');
            done();
        });
    });

    it('should block a connection with an expired auth token', function (done) {
        let tokenOpts = {username: username, expiresIn: 0};
        socket = ioClient.connect(url, getConnectionOpts(tokenOpts));
        socket.on('connect', function () {
            return done(new Error('Opened unauthorized connection'));
        });

        socket.on('error', function (err) {
            err.type.should.equal('UnauthorizedError');
            done();
        });
    });

    it('should open a connection with a valid auth token', function (done) {
        let tokenOpts = {username: username, expiresIn: config.get('jwt.exp')};
        socket = ioClient.connect(url, getConnectionOpts(tokenOpts));
        socket.on('connect', function () {
            return done();
        });

        socket.on('error', function (err) {
            return done(err);
        });
    });

    it('should emit users event on successfull connection', function (done) {
        let tokenOpts = {username: username, expiresIn: config.get('jwt.exp')};
        socket = ioClient.connect(url, getConnectionOpts(tokenOpts));
        socket.on('connect', function () {
            let timeout = setTimeout(() => done(new Error('Did not emit users event')), 3000);
            socket.on('users', function (users) {
                clearTimeout(timeout);
                users.should.include(username);
                done();
            });
        });

        socket.on('error', function (err) {
            return done(err);
        });
    });
});

function getConnectionOpts (tokenOpts) {
    let opts = { multiplex: false };

    if (tokenOpts) {
        let token = jwt.sign(
            {username: tokenOpts.username},
            config.get('jwt.secret'),
            {expiresIn: tokenOpts.expiresIn}
        );

        opts.query = 'token=' + token;
    }

    return opts;
}
