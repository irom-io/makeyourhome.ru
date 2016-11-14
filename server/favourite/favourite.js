const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');

const serverError = {error: {msg: 'serverError'}};
const postsSrc = path.resolve(__dirname, '../data/posts.json');
const projectsSrc = path.resolve(__dirname, '../data/projects.json');

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user, false, true);
    var isActive;

    if (!user.error) {
        var faveIndex = -1;

        user.favourite.forEach((fave, index) => {
            if ((fave.type == req.body.fave.type) && (fave.id == req.body.fave.id)) {
                faveIndex = index;
            }
        });

        if (faveIndex == -1) {
            user.favourite.unshift(req.body.fave);
            isActive = true;
        } else {
            user.favourite.splice(faveIndex, 1);
            isActive = false;
        }

        usersModel.save(user, true);
        res.send({isActive: isActive});
    } else {
        res.send(serverError);
    }
});

router.post('/view', function(req, res) {
    var user = usersModel.get(req.body.user, false, true);

    if (!user.error) {
        var favourite = [];
        var posts = fs.readFileSync(postsSrc, 'utf-8');
        var projects = fs.readFileSync(projectsSrc, 'utf-8');
        posts = JSON.parse(posts);
        projects = JSON.parse(projects);

        user.favourite.forEach((fave) => {
            if (fave.type == 'post') {
                posts.forEach((post) => {
                     if (post.id == fave.id) {
                         post.type = 'post';
                         favourite.push(post);
                         return false;
                     }
                });
            }
            if (fave.type == 'project') {
                projects.forEach((project) => {
                    if (project.id == fave.id) {
                        project.type = 'project';
                        favourite.push(project);
                        return false;
                    }
                });
            }
        });

        res.send(favourite);
    } else {
        res.send(serverError);
    }
});

module.exports = router;