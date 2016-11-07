const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');
const randomstring = require('randomstring');
const mail = require('../mail/mail');

const serverError = {error: {msg: 'serverError'}};
router.post('/', function(req, res) {
    var user = usersModel.get(req.body.user);

    if (!user.error) {
        mail({
            to: 'makeyourhome.ru@gmail.com',
            subject: `Новый вопрос от пользователя ${user.login}`,
            body: req.body.question
        });
    }

    res.send({});
});

router.post('/add', function(req, res) {
    var user = usersModel.get(req.body.user);

    if (!user.error && user.isAdmin) {
        var questions;
        questions = fs.readFileSync(path.resolve(__dirname, './questions.json'), 'utf-8');
        questions = JSON.parse(questions);
        questions.unshift({
            id: randomstring.generate(15),
            question: req.body.question,
            answer: req.body.answer
        });
        fs.writeFileSync(path.resolve(__dirname, './questions.json'), JSON.stringify(questions));
        res.send({});
    } else {
        res.send(serverError);
    }
});

module.exports = router;