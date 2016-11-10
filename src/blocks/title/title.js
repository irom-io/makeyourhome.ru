import React from 'react';
import title from './title.css';

class Title extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;

        return (
            <div
                className={title.wrapper}
            >
                {p_.children}
                <div className={title.line}></div>
            </div>
        );
    }
}

export default Title;