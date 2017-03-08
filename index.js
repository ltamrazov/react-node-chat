'use strict';

const logger = require('winston');

let server = require('./server');
let port = 9494;

server.listen(port, () => {
    logger.info('Server started on ' + port);
});
