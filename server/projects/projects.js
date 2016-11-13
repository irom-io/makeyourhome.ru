const fs = require('fs');
const path = require('path');
const find = require('array-find');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');
const favouriteModel = require('../favourite/favouriteModel');
const randomstring = require('randomstring');
const projectsSrc = path.resolve(__dirname, '../data/projects.json');

const serverError = {error: {msg: 'serverError'}};

router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);
    var projectId = req.body.projectId || null;

    if (!user.error && user.isAdmin) {
        var projects;
        projects = fs.readFileSync(projectsSrc, 'utf-8');
        projects = JSON.parse(projects);
        
        if (projectId) {
            var project = find(projects, function (project, index, array) {
                return project.id === projectId;
            });

            project.images = req.body.images;
            project[req.body.lang] = {
                title: req.body.title,
                shortText: req.body.shortText,
                longText: req.body.longText
            }
        } else {
            projectId = randomstring.generate(15);

            projects.unshift({
                id: projectId,
                images: req.body.images,
                [req.body.lang]: {
                    title: req.body.title,
                    shortText: req.body.shortText,
                    longText: req.body.longText
                }
            });    
        }
        
        fs.writeFileSync(projectsSrc, JSON.stringify(projects));
        res.send({projectId: projectId});
    } else {
        res.send(serverError);
    }
});

router.delete('/', function(req, res) {
    var user = usersModel.get(req.body.user);
    var projectId = req.body.projectId || null;

    if (!user.error && user.isAdmin) {
        var projects;
        projects = fs.readFileSync(projectsSrc, 'utf-8');
        projects = JSON.parse(projects);

        if (projectId) {
            projects.forEach((project, index) => {
                if (project.id == projectId) {
                    projects.splice(index, 1);
                }
            });

            fs.writeFileSync(projectsSrc, JSON.stringify(projects));
            res.send(projects);
        }
    } else {
        res.send(serverError);
    }
});

router.post('/view', function(req, res) {
    res.send(favouriteModel.getProjects(req.body.user));
});

module.exports = router;