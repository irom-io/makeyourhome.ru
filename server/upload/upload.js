const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersModel = require('../users/usersModel');
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
    var insertUser = JSON.parse(req.body.user);
    var user = usersModel.get(insertUser);
    var files = [];

    if (!user.error && user.isAdmin) {
        req.files.forEach((file) => {
            var parseFile = path.parse(file.originalname);

            files.push(`${file.filename}${parseFile.ext}`);
            fs.renameSync(file.path, `${file.path}${parseFile.ext}`)
        });
        res.send(files);
    } else {
        res.send(serverError);
    }
});

module.exports = router;