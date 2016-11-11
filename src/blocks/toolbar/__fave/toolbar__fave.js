import React from 'react';
import Favorite from 'react-icons/lib/md/favorite';
import L10n from 'blocks/l10n/l10n';
import ReactTooltip from 'react-tooltip';
import {findDOMNode} from 'react-dom';

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
        const user = null;

        if (!user) {
            return (
                <div>
                    <button
                        className={`${toolbar.icon} iconDisabled`}
                        data-tip={L10n('fave')}
                        data-class={`${toolbar.tip}`}
                    >
                        <Favorite size={20} />
                    </button>

                    <ReactTooltip />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default ToolbarFave;