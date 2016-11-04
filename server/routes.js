const users = require('./users/users');
const questions = require('./questions/questions');

module.exports = function (app) {
    app.use('/api/users', users);
    app.use('/api/questions', questions);
};