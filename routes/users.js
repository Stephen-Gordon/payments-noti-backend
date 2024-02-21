const express = require('express');

const router = express.Router();

const { profile, register } = require('../Controllers/user.controller')


router
    .get('/:id', profile)
    .post('/register', register)


module.exports = router;