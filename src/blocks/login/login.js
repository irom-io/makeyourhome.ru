import React from 'react';
import LoginAuth from 'blocks/login/__auth/login__auth';
import LoginRegistration from 'blocks/login/__registration/login__registration';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

class Login extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            type: p_.type,
            errorMsg: null
        };
    }
    onResponseAuth(response) {
        const p_ = this.props;

        if (response.error) {
            this.setState({errorMsg: response.error.msg})
        }

        p_.onResponseAuth(response);
    }
    onResponseRegistration(response) {
        const p_ = this.props;

        if (response.error) {
            this.setState({errorMsg: response.error.msg});
        } else {
            this.setState({
                registration: true,
                type: 'auth',
                errorMsg: null
            });
        }

        p_.onResponseRegistration(response);
    }
    render() {
        const s_ = this.state;
        const p_ = this.props;
        const errorMsg = s_.errorMsg && L10n(`errors.${s_.errorMsg}`);
        
        return (
            <div className={grid.w100}>
                {s_.registration &&
                <div className={`${text.normal} ${grid.mbNormal}`}>
                    <div className={`${text.colored} ${grid.mbMini}`}>
                        {L10n('auth.successReg1')}
                    </div>
                    <div className={grid.mbMini}>
                        {L10n('auth.successReg2')}
                    </div>
                    <div>
                        {L10n('auth.successReg3')}
                    </div>
                </div>
                }

                {!s_.registration &&
                <div className={`${grid.mbMini} ${text.colored} ${text.normal} ${text.center_mob}`}>
                    <span>{p_.descr} </span>
                    <span
                        className={(s_.type === 'registration') && `${text.underline} ${item.pointer}`}
                        onClick={() => {this.setState({type: 'auth'})}}
                    >
                        {p_.descr? L10n('auth.signIn').toLowerCase() : L10n('auth.signIn')}
                    </span>
                    <span> {L10n('or')} </span>
                    <span
                        className={(s_.type === 'auth') && `${text.underline} ${item.pointer}`}
                        onClick={() => {this.setState({type: 'registration'})}}
                    >
                        {L10n('auth.signUp').toLowerCase()}
                    </span>
                </div>
                }

                {errorMsg &&
                <div className={grid.mbMini}>
                    {errorMsg}
                </div>
                }

                {(s_.type === 'auth') &&
                <LoginAuth
                    onSubmit={p_.onSubmit}
                    onResponse={(response) => this.onResponseAuth(response)}
                />
                }
                {(s_.type === 'registration') &&
                <LoginRegistration
                    onSubmit={p_.onSubmit}
                    onResponse={(response) => this.onResponseRegistration(response)}
                />
                }
            </div>
        );
    }
}
Login.defaultProps = {
    type: 'auth'
};

export default Login;