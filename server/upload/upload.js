const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: path.resolve(__dirname, '../data/images/')});

const serverError = {error: {msg: 'serverError'}};

/*router.post('/', (req, res, next) => {
    res.send({});
});*/

router.post('/', upload.array('images'), function(req, res) {
    res.send({});
});

module.exports = router;