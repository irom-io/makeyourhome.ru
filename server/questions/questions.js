const express = require('express');
const router = express.Router();
const usersModel = require('../users/usersModel');
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

module.exports = router;