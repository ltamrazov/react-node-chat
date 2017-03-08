'use strict';

/**
 * Global router that mounts subrouters.
 */

const express = require('express');
const router = express.Router();

/**
 * Health check route will just return 200
 */
router.get('/health', (req, res, next) => {
    res.status(200).send('ok');
});

module.exports = router;
