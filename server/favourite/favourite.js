const find = require('array-find');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);

    if (!user.error) {
        var fave = req.body.fave;
        var faveIndex;
        switch (fave.type) {
            case 'post':
                faveIndex = user.favouritePosts.indexOf(fave.id);
                if (faveIndex === -1) {
                    user.favouritePosts.push(fave.id);
                } else {
                    user.favouritePosts.splice(faveIndex, 1);
                }
                break;
            case 'project':
                break;
        }

        user = usersModel.save(user, true);
        res.send(user);
    } else {
        res.send(serverError);
    }
});

/*router.get('/', function(req, res) {
    var posts = fs.readFileSync(postsSrc, 'utf-8');

    res.send(posts);
});*/

module.exports = router;