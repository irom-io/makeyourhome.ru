import React from 'react';
import Layout from 'blocks/layout/layout';
import AdminQuestions from 'pages/admin/__questions/admin__questions';
import AdminPosts from 'pages/admin/__posts/admin__posts';
import AdminProjects from 'pages/admin/__projects/admin__projects';
import {getLang} from 'blocks/page/__lang/page__lang';
import grid from 'blocks/grid/grid.css';

class Admin extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        const isAdmin = localStorage.getItem('user');
        const lang = getLang();

        if (!isAdmin) {
            this.context.router.push(`/projects?lang=${lang}`);
        }
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;
        const lang = getLang();

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
                className={`${grid.col} ${grid.center} ${grid.normalCenter}`}
            >
                {(() => {
                    switch (p_.location.query.type) {
                        case 'questions':
                            return (
                                <AdminQuestions
                                    questionId={p_.location.query.questionId}
                                    onLoad={() => {this.setState({loading: false})}}
                                    onSubmit={() => {this.setState({loading: true})}}
                                    onResponse={() => {this.setState({loading: false})}}
                                />
                            );
                        case 'posts':
                            return (
                                <AdminPosts
                                    postId={p_.location.query.postId}
                                    onLoad={() => {this.setState({loading: false})}}
                                    onSubmit={() => {this.setState({loading: true})}}
                                    onResponse={() => {this.setState({loading: false})}}
                                />
                            );
                        case 'projects':
                            return (
                                <AdminProjects
                                    projectId={p_.location.query.projectId}
                                    onLoad={() => {this.setState({loading: false})}}
                                    onSubmit={() => {this.setState({loading: true})}}
                                    onResponse={() => {this.setState({loading: false})}}
                                />
                            );
                        default:
                            this.context.router.push(`/notFound?lang=${lang}`);
                            break;
                    }
                })()}
            </Layout>
        );
    }
}
Admin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Admin;