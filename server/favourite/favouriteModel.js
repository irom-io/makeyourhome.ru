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
                user.favourite.forEach((fave) => {
                    if (fave.type == 'post' && fave.id == post.id) {
                        post.faveActive = true;
                    }
                });
            });
        }

        return posts;
    },
    getProjects: (insertUser) => {
        var user = usersModel.get(insertUser, false, true);
        var projects = fs.readFileSync(projectsSrc, 'utf-8');
        projects = JSON.parse(projects);

        if (!user.error) {
            projects.forEach((project) => {
                user.favourite.forEach((fave) => {
                    if (fave.type == 'project' && fave.id == project.id) {
                        project.faveActive = true;
                    }
                });
            });
        }

        return projects;
    }
};

module.exports = favouriteModel;