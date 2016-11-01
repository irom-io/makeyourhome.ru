import React from 'react';
import link from './link.css';
import {Link as ReactLink} from 'react-router';


class Link extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
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
                    to={p_.to}
                    className={className}
                    activeClassName={p_.activeClassName}
                >
                    {p_.children}
                </ReactLink>
        );
    }
}

export default Link;