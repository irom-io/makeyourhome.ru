const express = require('express');
const router = express.Router();
const usersModel = require('./usersModel');
const request = require('request');

const serverError = {error: {msg: 'serverError'}};
router.post('/', function(req, res) {
    if (!req.body.soc) {
        res.send(usersModel.get(req.body));
    } else {
        switch (req.body.soc) {
            case 'fb':
                request(`https://graph.facebook.com/v2.8/oauth/access_token?client_id=1682950858688158&redirect_uri=${req.body.redirect_uri}&client_secret=663746c3ba7fa4f4082e2b2a2cdb83bb&code=${req.body.code}`, (error, response, body) => {
                    body = JSON.parse(body);

                    ((access_token) => {
                        if (access_token) {
                            request(`https://graph.facebook.com/me?access_token=${access_token}`, (error, response, userBody) => {
                                userBody = JSON.parse(userBody);

                                var user = usersModel.save({login: `fb_${userBody.id}`, name: userBody.name, password: access_token.substr(0, 25)}, true);
                                res.send(user);
                            });
                        } else {
                            res.send(serverError);
                        }
                    })(body.access_token);
                });

                break;
            case 'vk':
                request(`https://oauth.vk.com/access_token?client_id=5691468&client_secret=VuNqv3dBokHQX27uaKSK&redirect_uri=${req.body.redirect_uri}&code=${req.body.code}`, (error, response, body) => {
                    body = JSON.parse(body);

                    ((access_token) => {
                        if (access_token) {
                            request(`https://api.vk.com/method/users.get?access_token=${access_token}`, (error, response, userBody) => {
                                userBody = JSON.parse(userBody);
                                userBody = userBody.response[0];

                                var user = usersModel.save({login: `vk_${userBody.uid}`, name: `${userBody.first_name} ${userBody.last_name}`, password: access_token.substr(0, 25)}, true);
                                res.send(user);
                            });
                        } else {
                            res.send(serverError);
                        }
                    })(body.access_token);
                });

                break;
        }
    }
});

router.post('/registration', function(req, res) {
    res.send(usersModel.registration(req.body));
});

router.get('/registration', function(req, res) {
    var user = usersModel.get({login: req.query.login}, true);
    
    if (req.query.userHash === user.userHash) {
        res.redirect('http://localhost:3000/login');
        usersModel.save({login: req.query.login, notValid: false, userHash: null}, true);
    } else {
        res.redirect('http://localhost:3000/notFound');
    }
});

module.exports = router;