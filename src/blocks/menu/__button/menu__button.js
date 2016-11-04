import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import menu from 'blocks/menu/menu.css';

class MenuButton extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    handleClickOutside() {
        const p_ = this.props;
        
        p_.onClickOutside();
    }
    render() {
        const p_ = this.props;
        
        return (
            <div
                onClick={p_.onClick}
                className={menu.button}
            >
                <div className={menu.buttonContent}>
                    <div className={menu.line}></div>
                    <div className={menu.line}></div>
                    <div className={menu.line}></div>
                </div>
            </div>
        );
    }
}

export default enhanceWithClickOutside(MenuButton);