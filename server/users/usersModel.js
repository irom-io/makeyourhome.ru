const fs = require('fs');
const path = require('path');
const validator = require('validator');
const mail = require('../mail/mail');
const randomstring = require('randomstring');
const L10nAuth = require('../../src/blocks/l10n/__auth/l10n__auth.json').auth;

const loginError = {error: {msg: 'loginError'}};
const serverError = {error: {msg: 'serverError'}};

const emptyName = {error: {msg: 'emptyName'}};
const notValidEmail = {error: {msg: 'notValidEmail'}};
const notValidUser = {error: {msg: 'notValidUser'}};
const userExist = {error: {msg: 'userExist'}};
const emptyPassword = {error: {msg: 'emptyPassword'}};
const passwordsDoNotMatch = {error: {msg: 'passwordsDoNotMatch'}};

const usersModel = {
    validate: (insertUser) => {
        insertUser.login && (insertUser.login = insertUser.login.substr(0, 100));
        insertUser.login && (insertUser.login = insertUser.login.toLowerCase());
        insertUser.password && (insertUser.password = insertUser.password.substr(0, 100));
        insertUser.name && (insertUser.name = insertUser.name.substr(0, 100));

        return insertUser;
    },
    get: (insertUser, noPassword) => {
        var user;
        var users;
        users = fs.readFileSync(path.resolve(__dirname, './users.json'), 'utf-8');
        users = JSON.parse(users);

        insertUser = usersModel.validate(insertUser);

        if (noPassword) {
            return users[insertUser.login]; 
        }
        
        if (usersModel.exists(insertUser) && (users[insertUser.login].password == insertUser.password)) {
            user = users[insertUser.login];
            
            if (user.notValid) {
                return notValidUser; 
            }
            
            return {name: user.name, login: user.login, password: user.password};
        }

        return loginError;
    },
    save: (insertUser, isReplace) => {
        var users;
        users = fs.readFileSync(path.resolve(__dirname, './users.json'), 'utf-8');
        users = JSON.parse(users);

        insertUser = usersModel.validate(insertUser);

        if (usersModel.exists(insertUser)) {
            if ((users[insertUser.login].password == insertUser.password) || isReplace) {
                users[insertUser.login] = Object.assign(users[insertUser.login], insertUser);
            } else {
                return loginError;
            }
        } else {
            users[insertUser.login] = usersModel.createUserObject(insertUser);
        }

        fs.writeFileSync(path.resolve(__dirname, './users.json'), JSON.stringify(users));
        return users[insertUser.login];
    },
    createUserObject: (insertUser) => {
        return {
            login: insertUser.login,
            password: insertUser.password,
            name: insertUser.name,
            notValid: insertUser.notValid || false,
            userHash: insertUser.userHash || null
        }
    },
    exists: (insertUser) => {
        var users;
        users = fs.readFileSync(path.resolve(__dirname, './users.json'), 'utf-8');
        users = JSON.parse(users);

        return (typeof users[insertUser.login] == 'object');
    },
    registration: (body) => {
        body = usersModel.validate(body);

        if (!body.name) { return emptyName; }
        if (!validator.isEmail(body.login)) { return notValidEmail; }
        if (!body.password) { return emptyPassword; }
        if (body.password && body.password !== body.passwordRepeat) { return passwordsDoNotMatch; }
        if (usersModel.exists(body)) { return userExist; }

        body.userHash = randomstring.generate();

        var ref = `http://82.146.36.41/api/users/registration?login=${body.login}&userHash=${body.userHash}&lang=${body.lang}`;
        mail({
            to: body.login,
            subject: L10nAuth.verify1[body.lang],
            body: `${L10nAuth.verify2[body.lang]} <a target="_blank" href="${ref}">${L10nAuth.confirm[body.lang]}</a>`
        });
        return usersModel.save(Object.assign(body, {notValid: true}));
    }
};

module.exports = usersModel;