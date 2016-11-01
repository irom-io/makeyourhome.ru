import React from 'react';
import button from './button.css';

class Button extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        let p_ = {...this.props};
        const isText = p_.isText;
        delete p_.isText;

        p_.className = p_.className? `${button.item} ${p_.className}` : button.item;

        return isText? (<span {...p_} />) : (<button {...p_} />);
    }
}

export default Button;