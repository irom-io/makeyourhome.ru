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
        var fave = req.body.fave;
        var faveIndex;
        switch (fave.type) {
            case 'post':
                faveIndex = user.favouritePosts.indexOf(fave.id);
                if (faveIndex === -1) {
                    user.favouritePosts.push(fave.id);
                    isActive = true;
                } else {
                    user.favouritePosts.splice(faveIndex, 1);
                    isActive = false;
                }
                break;
            case 'project':
                faveIndex = user.favouriteProjects.indexOf(fave.id);
                if (faveIndex === -1) {
                    user.favouriteProjects.push(fave.id);
                    isActive = true;
                } else {
                    user.favouriteProjects.splice(faveIndex, 1);
                    isActive = false;
                }
                break;
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
        var favouritePosts = [];
        var posts = fs.readFileSync(postsSrc, 'utf-8');

        posts = JSON.parse(posts);
        posts.forEach((post) => {
            if (user.favouritePosts.indexOf(post.id) !== -1) {
                favouritePosts.push(post);
            }
        });

        var favouriteProjects = [];
        var projects = fs.readFileSync(projectsSrc, 'utf-8');

        projects = JSON.parse(projects);
        projects.forEach((project) => {
            if (user.favouriteProjects.indexOf(project.id) !== -1) {
                favouriteProjects.push(project);
            }
        });
        var favourite = favouriteProjects.concat(favouritePosts);

        res.send(favourite);
    } else {
        res.send(serverError);
    }
});

module.exports = router;