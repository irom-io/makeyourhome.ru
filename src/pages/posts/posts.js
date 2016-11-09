import React from 'react';
import Layout from 'blocks/layout/layout';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import TileLine from 'blocks/tile/_line/tile_line';
import {getLang} from 'blocks/page/__lang/page__lang';
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
            items: [],
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

                {s_.items.map((item, index) => {
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
                            src={item.images[0]}
                            text={title}
                            l10nText={true}
                            link={{}}
                        >
                            {shortText}
                        </TileLine>
                    )
                })}
            </Layout>
        );
    }
}
Posts.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Posts;