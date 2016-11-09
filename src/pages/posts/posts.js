import React from 'react';
import Layout from 'blocks/layout/layout';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import PostsSlider from 'pages/posts/__slider/posts__slider';
import api from 'blocks/api/api';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

const step = 3;
class Posts extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            question: '',
            loading: true,
            items: null,
            visibleItems: step
        };
    }
    componentDidMount() {
        const self = this;

        api.get('posts')
            .then((response) => {
                if (!response.error) {
                    self.setState({
                        items: response,
                        loading: false
                    });
                    console.log(response);
                } else {
                    self.setState({loading: false});
                }
            });
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

                {s_.items &&
                <div>
                    <div className={grid.mbMini}>

                    </div>
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