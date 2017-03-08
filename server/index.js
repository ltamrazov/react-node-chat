'use strict';

const express = require('express');
const path = require('path');

let app = express();
app.use(express.static(path.join(__dirname, '../client')));

app.get('/health', (req, res, next) => {
    res.status(200).end('ok');
});

module.exports = app;
