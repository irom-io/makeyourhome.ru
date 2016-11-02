const fs = require('fs');
const path = require('path');

const loginError = {error: {msg: 'loginError'}};
const serverError = {error: {msg: 'serverError'}};

const emptyName = {error: {msg: 'emptyName'}};
const notValidEmail = {error: {msg: 'notValidEmail'}};
const userExist = {error: {msg: 'userExist'}};
const emptyPassword = {error: {msg: 'emptyPassword'}};
const passwordsDoNotMatch = {error: {msg: 'passwordsDoNotMatch'}};

const usersModel = {
    validate: (insertUser) => {
        insertUser.login = insertUser.login.substr(0, 100);
        insertUser.login = insertUser.login.toLowerCase();
        insertUser.password = insertUser.password.substr(0, 100);

        return insertUser;
    },
    get: (insertUser) => {
        var user;
        var users;
        users = fs.readFileSync(path.resolve(__dirname, './users.json'), 'utf-8');
        users = JSON.parse(users);

        insertUser = usersModel.validate(insertUser);

        if (usersModel.exists(insertUser) && (users[insertUser.login].password == insertUser.password)) {
            user = users[insertUser.login];
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
            users[insertUser.login] = insertUser;
        }

        fs.writeFileSync(path.resolve(__dirname, './users.json'), JSON.stringify(users));
        return users[insertUser.login];
    },
    exists: (insertUser) => {
        var users;
        users = fs.readFileSync(path.resolve(__dirname, './users.json'), 'utf-8');
        users = JSON.parse(users);

        return (typeof users[insertUser.login] == 'object');
    },
    registration: (body) => {
        if (!body.name) { return emptyName; }
        if (!body.password) { 
            return emptyPassword; 
        } else if (body.password !== body.passwordRepeat) {
            return passwordsDoNotMatch;
        }

        return {};
    }
};

module.exports = usersModel;