import React from 'react';
import Layout from 'blocks/layout/layout';
import Login from 'blocks/login/login';
import Button from 'blocks/button/button';
import TileLine from 'blocks/tile/_line/tile_line';
import {getUser} from 'blocks/auth/auth';
import L10n from 'blocks/l10n/l10n';
import {createSrc} from 'blocks/item/item';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

const step = 3;
class Favourite extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false,
            items: [],
            visibleItems: step
        };
        this.loadFave = this.loadFave.bind(this);
    }
    componentDidMount() {
        const user = getUser();

        if (user) { this.loadFave(user); }
    }
    componentWillReceiveProps() {
        const user = getUser();

        if (user) { this.loadFave(user); }
    }
    onResponseAuth(response) {
        if (!response.error) {
            this.loadFave(response);
        } else {
            this.setState({loading: false});
        }
    }
    loadFave(user) {
        const self = this;

        self.setState({loading: true});
        api.post('favourite/view', {user: user})
            .then((response) => {
                if (!response.error) {
                    self.setState({
                        items: response,
                        loading: false
                    });
                } else {
                    self.setState({loading: false});
                }
            });
    }
    seeMore() {
        this.setState({visibleItems: (this.state.visibleItems + step)})
    }
    render() {
        const s_ = this.state;
        const user = getUser();
        const lang = getLang();

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {!user &&
                <Login
                    descr={`${L10n('toFave')},`}
                    onSubmit={() => {this.setState({loading: true})}}
                    onResponseAuth={(response) => this.onResponseAuth(response)}
                    onResponseRegistration={() => {this.setState({loading: false})}}
                />
                }

                {user && s_.items &&
                <div>
                    {!s_.loading && (s_.items.length === 0) &&
                    L10n('noFave')
                    }
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
                                    key={`post_${index}`}
                                    src={createSrc(item.images[0])}
                                    text={title}
                                    l10nText={true}
                                    link={{to: `/posts/${item.id}`}}
                                    description={shortText}
                                />
                            )
                        } else {
                            return '';
                        }
                    })}
                </div>
                }

                {user && s_.items && (s_.visibleItems < s_.items.length) &&
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
Favourite.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Favourite;