'use strict';
const chat = require('./chat.js');

module.exports = function (server){
    return chat(server);
};
