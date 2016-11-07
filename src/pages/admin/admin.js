import React from 'react';
import Layout from 'blocks/layout/layout';
import {getLang} from 'blocks/page/__lang/page__lang';
import grid from 'blocks/grid/grid.css';

class Admin extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false
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

        console.log(p_.location.query);
        return (
            <Layout
                loading={s_.loading}
                isPage={true}
                className={`${grid.col} ${grid.center} ${grid.normalCenter}`}
            >

            </Layout>
        );
    }
}
Admin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Admin;