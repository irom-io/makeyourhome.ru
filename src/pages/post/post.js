import React from 'react';
import Layout from 'blocks/layout/layout';
import api from 'blocks/api/api';
import {getLang} from 'blocks/page/__lang/page__lang';
import PostSlider from 'pages/post/__slider/post__slider';
import Title from 'blocks/title/title';
import Toolbar from 'blocks/toolbar/toolbar';
import {createSrc} from 'blocks/item/item';
import {getUser} from 'blocks/auth/auth';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

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
        const user = getUser();

        api.post('posts', {user: user})
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
        const lang = getLang();

        let title = 'No translate';
        let shortText = 'No translate';
        let longText = 'No translate';

        if (s_.post && s_.post[lang]) {
            title = s_.post[lang].title;
            shortText = s_.post[lang].shortText;
            longText = s_.post[lang].longText;
        }

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {s_.post &&
                <div>
                    <div className={grid.mbMini}>
                        <Title>
                            {title}
                        </Title>
                    </div>
                    <div className={grid.mbMini}>
                        <PostSlider
                            images={s_.post.images}
                        />
                    </div>
                    <div className={`${text.preWrap} ${text.justify} ${grid.mbMicro} ${text.mini_tabMini}`}>
                        {longText}
                    </div>
                    <Toolbar
                        url={`/posts/${s_.post.id}`}
                        title={title}
                        media={createSrc(s_.post.images[0])}
                        description={shortText}
                        fave={{id: s_.post.id, type: 'post'}}
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