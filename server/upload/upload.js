const path = require('path');
const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    res.send({});
});

module.exports = router;