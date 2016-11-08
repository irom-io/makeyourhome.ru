const fs = require('fs');
const path = require('path');
const find = require('array-find');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');
const randomstring = require('randomstring');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);
    var postId = req.body.postId || null;

    if (!user.error && user.isAdmin) {
        var posts;
        posts = fs.readFileSync(path.resolve(__dirname, './posts.json'), 'utf-8');
        posts = JSON.parse(posts);
        
        if (postId) {
            var post = find(posts, function (post, index, array) {
                return post.id === postId;
            });

            post[req.body.lang] = {
                title: req.body.title,
                shortText: req.body.shortText,
                longText: req.body.longText
            }
        } else {
            postId = randomstring.generate(15);

            posts.unshift({
                id: postId,
                [req.body.lang]: {
                    title: req.body.title,
                    shortText: req.body.shortText,
                    longText: req.body.longText
                }
            });    
        }
        
        fs.writeFileSync(path.resolve(__dirname, './posts.json'), JSON.stringify(posts));
        res.send({postId: postId});
    } else {
        res.send(serverError);
    }
});

router.delete('/', function(req, res) {
    var user = usersModel.get(req.body.user);
    var postId = req.body.postId || null;

    if (!user.error && user.isAdmin) {
        var posts;
        posts = fs.readFileSync(path.resolve(__dirname, './posts.json'), 'utf-8');
        posts = JSON.parse(posts);

        if (postId) {
            posts.forEach((post, index) => {
                if (post.id == postId) {
                    posts.splice(index, 1);
                }
            });

            fs.writeFileSync(path.resolve(__dirname, './posts.json'), JSON.stringify(posts));
            res.send(posts);
        }
    } else {
        res.send(serverError);
    }
});

router.get('/', function(req, res) {
    var posts = fs.readFileSync(path.resolve(__dirname, './posts.json'), 'utf-8');

    res.send(posts);
});

module.exports = router;