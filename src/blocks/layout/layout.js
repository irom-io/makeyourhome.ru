import React from 'react';
import './layoutStyle.css';
import layout from './layout.css';
import page from 'blocks/page/page.css';

class Layout extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        let className = [`${layout.wrapper}`,`${p_.className}`];

        if (p_.isPage) {
            className.push(`${page.content}`)
        }

        className = className.join(' ');
        return (
            <div className={className}>
                {p_.children}

                {p_.loading &&
                    <div className={layout.disabled}>
                        <div className="loader"></div>
                    </div>
                }
            </div>
        );
    }
}
Layout.defaultProps = {
    className: ''
};

export default Layout;