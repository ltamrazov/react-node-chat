'use strict';

let server = require('./server');
let port = 9494;

server.listen(port, () => {
    console.log('Server started on ' + port);
});
