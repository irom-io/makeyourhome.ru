import React from 'react';
import Favorite from 'react-icons/lib/md/favorite';
import L10n from 'blocks/l10n/l10n';
import ReactTooltip from 'react-tooltip';
import {getUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';

import toolbar from 'blocks/toolbar/toolbar.css';

class ToolbarFave extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            isActive: p_.fave.isActive
        };
    }
    onClick() {
        const self = this;
        const p_ = this.props;
        const user = getUser();

        this.setState({loading: true});
        api.post('favourite', {fave: p_.fave, user: {login: user.login, password: user.password}})
        .then((response) => {
            if (!response.error) {
                self.setState({isActive: response.isActive})
            }
        });
    }
    render() {
        const user = getUser();
        const s_ = this.state;

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
            const className = (s_.isActive)? toolbar.iconActive : toolbar.icon;
            
            return (
                <button
                    className={className}
                    onClick={() => this.onClick()}
                >
                    <Favorite size={20} />
                </button>
            )
        }
    }
}

export default ToolbarFave;