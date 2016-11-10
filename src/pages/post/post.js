import React from 'react';
import Layout from 'blocks/layout/layout';
import api from 'blocks/api/api';
import {getLang} from 'blocks/page/__lang/page__lang';
import PostSlider from 'pages/post/__slider/post__slider';

class Post extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        const self = this;
        const p_ = self.props;
        const lang = getLang();

        api.get('posts')
            .then((response) => {
                let isCorrectPostId = false;
                self.setState({loading: false});

                if (response && p_.params.postId) {
                    response.forEach((post) => {
                        if (post.id === p_.params.postId) {
                            self.setState({
                                post: post
                            });

                            isCorrectPostId = true;
                        }
                    });

                    if (!isCorrectPostId) {
                        this.context.router.push(`/notFound?lang=${lang}`);
                    }
                }
            });
    }
    render() {
        const s_ = this.state;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {s_.post &&
                <div>
                    <PostSlider 
                        images={s_.post.images}
                    />
                </div>
                }
            </Layout>
        )
    }
}
Post.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Post;