import React from 'react';
import Favorite from 'react-icons/lib/md/favorite';
import L10n from 'blocks/l10n/l10n';
import ReactTooltip from 'react-tooltip'

import toolbar from 'blocks/toolbar/toolbar.css';

class ToolbarFave extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    onClick() {
        const p_ = this.props;

        console.log(p_.fave);
    }
    render() {
        return (
            <button
                title={L10n('fave')}
                className={toolbar.icon}
                onClick={() => this.onClick()}
            >
                <Favorite size={20} />
            </button>
        )
    }
}

export default ToolbarFave;