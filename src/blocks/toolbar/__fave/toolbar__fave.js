import React from 'react';
import Favorite from 'react-icons/lib/md/favorite';
import L10n from 'blocks/l10n/l10n';
import ReactTooltip from 'react-tooltip';
import {getUser, setUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';

import toolbar from 'blocks/toolbar/toolbar.css';

class ToolbarFave extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    onClick() {
        const p_ = this.props;
        const user = getUser();

        this.setState({loading: true});
        api.post('favourite', {fave: p_.fave, user: {login: user.login, password: user.password}})
            .then((response) => {
                 if (!response.error) {
                     setUser(response);
                     this.setState({
                         loading: false
                     });
                 } else {
                     this.setState({loading: false});
                 }
            });
    }
    render() {
        const user = getUser();
        const p_ = this.props;

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
            let key;
            
            switch (p_.fave.type) {
                case 'post':
                    key = 'favouritePosts';
                    break;
                case 'project':
                    key = 'favouriteProjects';
                    break;
                default:
                    break;
            }

            const className = (user[key].indexOf(p_.fave.id) !== -1)? toolbar.iconActive : toolbar.icon;
            
            //TODO setuser save to localstorage
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