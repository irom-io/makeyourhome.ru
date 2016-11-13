import React from 'react';
import Layout from 'blocks/layout/layout';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import TileLine from 'blocks/tile/_line/tile_line';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';
import {createSrc} from 'blocks/item/item';
import AdminEdit from 'blocks/admin/__edit/admin__edit';
import L10n from 'blocks/l10n/l10n';
import {getUser} from 'blocks/auth/auth';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

const step = 3;
class Posts extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            question: '',
            loading: true,
            items: [],
            visibleItems: step
        };
    }
    componentDidMount() {
        const self = this;
        const user = getUser();

        api.post('posts/view', {user: user})
            .then((response) => {
                if (!response.error) {
                    self.setState({
                        items: response,
                        loading: false
                    });
                } else {
                    self.setState({
                        loading: false
                    });
                }
            })
    }
    deletePost(user, postId) {
        const self = this;

        self.setState({loading: true});
        api.delete('posts', {user: user, postId: postId})
            .then((response) => {
                if (response && !response.error) {
                    self.setState({items: response, loading: false});
                }
            });
    }
    seeMore() {
        this.setState({visibleItems: (this.state.visibleItems + step)})
    }
    render() {
        const s_ = this.state;
        let user = localStorage.getItem('user');
        if (user) {user = JSON.parse(user);}
        const isAdmin = localStorage.getItem('isAdmin');
        const lang = getLang();

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
                    {s_.items.map((item, index) => {
                        if (index < s_.visibleItems) {
                            let title = 'noTranslate';
                            let shortText = 'noTranslate';

                            if (item[lang]) {
                                title = item[lang].title;
                                shortText = item[lang].shortText;
                            }

                            return (
                                <TileLine
                                    name="posts"
                                    key={`post_${index}`}
                                    src={createSrc(item.images[0])}
                                    text={title}
                                    l10nText={true}
                                    link={{to: `/posts/${item.id}`}}
                                    description={shortText}
                                    fave={{type: 'post', id: item.id, isActive: item.faveActive}}
                                >
                                    {isAdmin &&
                                    <AdminEdit
                                        editTo={`/admin?type=posts&postId=${item.id}`}
                                        onDelete={() => this.deletePost(user, item.id)}
                                    />
                                    }
                                </TileLine>
                            )
                        } else {
                            return '';
                        }
                    })}
                </div>
                }

                {s_.items && (s_.visibleItems < s_.items.length) &&
                <div className={`${text.center} ${grid.mtMini}`}>
                    <Button
                        onClick={() => this.seeMore()}
                        className={grid.w100_mob}
                    >
                        {L10n('more')}
                    </Button>
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