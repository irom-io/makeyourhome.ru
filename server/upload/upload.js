const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: path.resolve(__dirname, './images/')});

const serverError = {error: {msg: 'serverError'}};

router.post('/', upload.array('images'), function(req, res) {
    console.log(req.files);
    res.send({});
});

module.exports = router;