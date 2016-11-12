import React from 'react';
import {findDOMNode} from 'react-dom';

import menu from 'blocks/menu/menu.css';

class MenuButton extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }
    componentDidMount () {
        window.__myapp_container.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount () {
        window.__myapp_container.removeEventListener('click', this.handleDocumentClick)
    }
    handleDocumentClick(e) {
        const menuButton = findDOMNode(this.refs.menuButton);

        if (!menuButton.contains(e.target)) {
            this.props.onClickOutside(e);
        }
    }
    render() {
        const p_ = this.props;
        
        return (
            <div
                onClick={p_.onClick}
                className={menu.button}
                ref="menuButton"
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

export default MenuButton;