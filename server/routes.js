const users = require('./users/users');
const questions = require('./questions/questions');
const posts = require('./posts/posts');
const upload = require('./upload/upload');

module.exports = function (app) {
    app.use('/api/users', users);
    app.use('/api/questions', questions);
    app.use('/api/posts', posts);
    app.use('/api/upload', upload);
};