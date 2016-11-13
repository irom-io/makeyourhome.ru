const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');

const serverError = {error: {msg: 'serverError'}};
const postsSrc = path.resolve(__dirname, '../data/posts.json');

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user, false, true);

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

        usersModel.save(user, true);
        res.send({favouritePosts: user.favouritePosts});
    } else {
        res.send(serverError);
    }
});

router.post('/view', function(req, res) {
    var user = usersModel.get(req.body.user, false, true);

    if (!user.error) {
        var favouritePosts = [];
        var posts = fs.readFileSync(postsSrc, 'utf-8');
        posts = JSON.parse(posts);

        posts.forEach((post) => {
            if (user.favouritePosts.indexOf(post.id) !== -1) {
                favouritePosts.push(post);
            }
        });

        res.send(favouritePosts);
    } else {
        res.send(serverError);
    }
});

module.exports = router;