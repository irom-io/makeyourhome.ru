import React from 'react';
import LoginAuth from 'blocks/login/__auth/login__auth';
import LoginRegistration from 'blocks/login/__registration/login__registration';

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
        
        return (
            <div className={grid.w100}>
                {s_.registration &&
                <div className={`${text.normal} ${grid.mbNormal}`}>
                    <div className={`${text.colored} ${grid.mbMini}`}>
                        Регистрация прошла успешно.
                    </div>
                    <div className={grid.mbMini}>
                        Для подтверждения e-mail, Вам отправлено письмо.
                    </div>
                    <div>
                        Перейдите по сссылке из письма и, затем, авторизуйтесь.
                    </div>
                </div>
                }

                {!s_.registration &&
                <div className={`${grid.mbMini} ${text.colored} ${text.normal}`}>
                    <span>{p_.descr} </span>
                    <span
                        className={(s_.type === 'registration') && `${text.underline} ${item.pointer}`}
                        onClick={() => {this.setState({type: 'auth'})}}
                    >
                        {p_.descr? 'Авторизуйтесь'.toLowerCase() : 'Авторизуйтесь'}
                    </span>
                    <span> или </span>
                    <span
                        className={(s_.type === 'auth') && `${text.underline} ${item.pointer}`}
                        onClick={() => {this.setState({type: 'registration'})}}
                    >
                        зарегистрируйтесь
                    </span>
                </div>
                }

                {s_.errorMsg &&
                <div className={grid.mbMini}>
                    {s_.errorMsg}
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