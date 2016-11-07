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
import Blog from 'pages/blog/blog';
import NotFound from 'pages/notFound/notFound';

renderStyles();
ReactDOM.render(
    <Router
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0)}
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
            <Route path="/blog" component={Blog}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>,
    document.getElementById('root')
);