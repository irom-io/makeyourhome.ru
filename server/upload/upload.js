const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
    dest: path.resolve(__dirname, '../data/images/')
});

const serverError = {error: {msg: 'serverError'}};

router.post('/', upload.array('images'), function(req, res) {
    console.log(req.files);

    res.send({});
});

module.exports = router;