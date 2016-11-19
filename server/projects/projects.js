const fs = require('fs');
const path = require('path');
const find = require('array-find');
const mail = require('../mail/mail');

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


            project = Object.assign(project, req.body.data);
            delete project.faveActive;
        } else {
            projectId = randomstring.generate(15);
            project = Object.assign({}, req.body.data);
            project.id = projectId;

            projects.unshift(project);
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

router.post('/order', function(req, res) {
    var user = usersModel.get(req.body.user);
    var body = '';

    if (!user.error) {
        req.body.orderList.forEach((item) => {
            body += `${item.text}: ${item.value} р.;`;
        });

        body += `Итого: ${req.body.total}р.;`;

        mail({
            to: 'makeyourhome.ru@gmail.com',
            subject: `Заказ проекта от пользователя ${user.login}`,
            body: body
        });
    }

    res.send({});
});

router.post('/individualOrder', function(req, res) {
    var user = usersModel.get(req.body.user);
    var subject = (req.body.projectName) ? 'Заказ на изменение проекта' : 'Заказ на индивидуальный проект';

    if (!user.error) {
        mail({
            to: 'makeyourhome.ru@gmail.com',
            subject: `${subject} от пользователя ${user.login}`,
            body: `
                Телефон: ${req.body.phone} <br /><br />
                Описание: <div style="white-space: pre-wrap;">${req.body.text}</div>
            `
        });
    }

    res.send({});
});

module.exports = router;