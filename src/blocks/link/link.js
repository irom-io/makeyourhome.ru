import React from 'react';
import link from './link.css';
import {getLang} from 'blocks/page/__lang/page__lang';
import {Link as ReactLink} from 'react-router';
import config from '../../../server/data/config.json';

let globalRouter;

export const addLang = (to) => {
    const lang = getLang();
    let location = globalRouter.createLocation(to);
    let href = to;

    if (!location.query.lang && lang !== 'ru') {
        location.query.lang = lang;
        href = globalRouter.createHref(location);
    }
    href = (href.indexOf('/') === 0)? href : `/${href}`;

    return `http://${config.host}${href}`;
};

class Link extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
        globalRouter = this.context.router;
    }
    createHref(to) {
        const lang = getLang();
        const router = this.context.router;
        let location = router.createLocation(to);
        let href = to;

        if (!location.query.lang && lang !== 'ru') {
            location.query.lang = lang;
            href = router.createHref(location);
        }
        href = (href.indexOf('/') === 0)? href : `/${href}`;

        return href;
    }
    render() {
        let p_ = {...this.props};
        p_.className = p_.className? `${link.init} ${p_.className}` : link.init;

        if (p_.to) {
            p_.to = (() => this.createHref(p_.to))();
        }

        return (
                (p_.href) ?
                <a {...p_} />
                :
                <ReactLink {...p_} />
        );
    }
}
Link.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Link;