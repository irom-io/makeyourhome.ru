const fs = require('fs');
const path = require('path');
const serverError = {error: {msg: 'serverError'}};
const usersModel = require('../users/usersModel');
const postsSrc = path.resolve(__dirname, '../data/posts.json');
const projectsSrc = path.resolve(__dirname, '../data/projects.json');

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
    },
    getProjects: (insertUser) => {
        var user = usersModel.get(insertUser, false, true);
        var projects = fs.readFileSync(projectsSrc, 'utf-8');
        projects = JSON.parse(projects);

        if (!user.error) {
            projects.forEach((post) => {
                if (user.favouriteProjects.indexOf(post.id) !== -1) {
                    post.faveActive = true
                }
            });
        }

        return projects;
    }
};

module.exports = favouriteModel;