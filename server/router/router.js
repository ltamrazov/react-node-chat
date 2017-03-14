'use strict';

/**
 * Global router that mounts subrouters.
 */

const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

/**
 * Health check route will just return 200
 */
router.get('/health', (req, res, next) => {
    res.status(200).send('ok');
});

/**
 * Authentication
 */
const authController = controllers.auth;
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
