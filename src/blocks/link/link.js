import React from 'react';
import link from './link.css';
import {Link as ReactLink} from 'react-router';

class Link extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {};
    }
    createHref(to) {
        const lang = 'en';
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
        const p_ = this.props;
        const className = p_.className? `${link.init} ${p_.className}` : link.init;

        return (
                (p_.href) ?
                <a
                    href={p_.href}
                    target={p_.target}
                    className={className}
                >
                    {p_.children}
                </a>
                :
                <ReactLink
                    to={(() => this.createHref(p_.to))()}
                    className={className}
                    activeClassName={p_.activeClassName}
                >
                    {p_.children}
                </ReactLink>
        );
    }
}
Link.contextTypes = {
    router: React.PropTypes.object.isRequired
};
Link.defaultProps = {
    to: '/'
};

export default Link;