const fs = require('fs');
const path = require('path');
const find = require('array-find');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');
const favouriteModel = require('../favourite/favouriteModel');
const randomstring = require('randomstring');
const postsSrc = path.resolve(__dirname, '../data/posts.json');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);
    var postId = req.body.postId || null;
    var post;

    if (!user.error && user.isAdmin) {
        var posts;
        posts = fs.readFileSync(postsSrc, 'utf-8');
        posts = JSON.parse(posts);
        
        if (postId) {
            post = find(posts, function (post, index, array) {
                return post.id === postId;
            });
            
            post = Object.assign(post, req.body.data);
            delete post.faveActive;
        } else {
            postId = randomstring.generate(15);
            post = Object.assign({}, req.body.data);
            post.id = postId;
            
            posts.unshift(post);    
        }
        
        fs.writeFileSync(postsSrc, JSON.stringify(posts));
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
        posts = fs.readFileSync(postsSrc, 'utf-8');
        posts = JSON.parse(posts);

        if (postId) {
            posts.forEach((post, index) => {
                if (post.id == postId) {
                    posts.splice(index, 1);
                }
            });

            fs.writeFileSync(postsSrc, JSON.stringify(posts));
            res.send(posts);
        }
    } else {
        res.send(serverError);
    }
});

router.post('/view', function(req, res) {
    res.send(favouriteModel.getPosts(req.body.user));
});

module.exports = router;