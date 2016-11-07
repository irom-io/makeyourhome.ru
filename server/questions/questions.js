const fs = require('fs');
const path = require('path');
const find = require('array-find');

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
    var questionId = req.body.questionId || null;

    if (!user.error && user.isAdmin) {
        var questions;
        questions = fs.readFileSync(path.resolve(__dirname, './questions.json'), 'utf-8');
        questions = JSON.parse(questions);
        
        if (questionId) {
            var question = find(questions, function (question, index, array) {
                return question.id === questionId;
            });

            question[req.body.lang] = {
                question: req.body.question,
                answer: req.body.answer
            }
        } else {
            questionId = randomstring.generate(15);

            questions.push({
                id: questionId,
                [req.body.lang]: {
                    question: req.body.question,
                    answer: req.body.answer   
                }
            });    
        }
        
        fs.writeFileSync(path.resolve(__dirname, './questions.json'), JSON.stringify(questions));
        res.send({questionId: questionId});
    } else {
        res.send(serverError);
    }
});

router.get('/', function(req, res) {
    var questions = fs.readFileSync(path.resolve(__dirname, './questions.json'), 'utf-8');

    res.send(questions);
});

module.exports = router;