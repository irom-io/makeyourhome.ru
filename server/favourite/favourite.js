const find = require('array-find');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);

    if (!user.error) {
        console.log(user);
        console.log(req.body.fave);
    } else {
        res.send(serverError);
    }
});

/*router.get('/', function(req, res) {
    var posts = fs.readFileSync(postsSrc, 'utf-8');

    res.send(posts);
});*/

module.exports = router;