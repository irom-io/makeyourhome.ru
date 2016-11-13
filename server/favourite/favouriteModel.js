const fs = require('fs');
const path = require('path');
const serverError = {error: {msg: 'serverError'}};
const usersModel = require('../users/usersModel');
const postsSrc = path.resolve(__dirname, '../data/posts.json');

const favouriteModel = {
    getPosts: (insertUser) => {
        var user = usersModel.get(insertUser, false, true);
        var posts = fs.readFileSync(postsSrc, 'utf-8');
        posts = JSON.parse(posts);

        if (!user.error) {
            posts.forEach((post) => {
                if (user.favouritePosts.indexOf(post.id) !== -1) {
                    post.faveActive = true
                }
            });
        }

        return posts;
    }
};

module.exports = favouriteModel;