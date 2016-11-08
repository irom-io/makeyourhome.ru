import React from 'react';
import Layout from 'blocks/layout/layout';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Posts extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false
        }
    }
    render() {
        const s_ = this.state;
        const isAdmin = localStorage.getItem('isAdmin');

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {isAdmin &&
                <div className={`${text.center} ${grid.mbMini}`}>
                    <Link
                        className={grid.w100_mob}
                        to="/admin?type=posts"
                    >
                        <Button
                            className={grid.w100_mob}
                        >
                            Добавить запись
                        </Button>
                    </Link>
                </div>
                }
            </Layout>
        );
    }
}
Posts.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Posts;