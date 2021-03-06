import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {renderStyles} from 'jcss';

import Page from 'blocks/page/page';
import Admin from 'pages/admin/admin';
import Main from 'pages/main/main';
import Projects from 'pages/projects/projects';
import Project from 'pages/project/project';
import Styles from 'pages/styles/styles';
import Collections from 'pages/collections/collections';
import Questions from 'pages/questions/questions';
import Login from 'pages/login/login';
import Posts from 'pages/posts/posts';
import Post from 'pages/post/post';
import Favourite from 'pages/favourite/favourite';
import Order from 'pages/order/order';
import NotFound from 'pages/notFound/notFound';

renderStyles();
window.__myapp_container = document.getElementById('root');

ReactDOM.render(
    <Router
        history={browserHistory}
    >
        <Route path="" component={Page}>
            <Route path="/" component={Main}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/styles" component={Styles}/>
            <Route path="/collections" component={Collections}/>
            <Route path="/questions" component={Questions}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/projects/:projectId" component={Project}/>
            <Route path="/login" component={Login}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/posts/:postId" component={Post}/>
            <Route path="/favourite" component={Favourite}/>
            <Route path="/order" component={Order}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>,
    window.__myapp_container
);