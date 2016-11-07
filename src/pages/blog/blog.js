import React from 'react';
import Layout from 'blocks/layout/layout';

class Blog extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false
        }
    }
    render() {
        const s_ = this.state;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                Blog
            </Layout>
        );
    }
}
Blog.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Blog;