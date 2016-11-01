var users = require('./users/users');

module.exports = function (app) {
    app.use('/api/users', users);
};