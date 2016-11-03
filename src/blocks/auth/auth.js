import React from 'react';
import Link from 'blocks/link/link';
import Layout from 'blocks/layout/layout';
import {FacebookIcon, VKIcon} from 'pages/projects/__share/projects__share';
import AccountCircle from 'react-icons/lib/md/account-circle'
import api from 'blocks/api/api';
import queryString from 'query-string';
import L10n from 'blocks/l10n/l10n';

import auth from './auth.css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';
import css from 'blocks/config/css';

let startLoginCallbacks = [];
let loginUserCallbacks = [];
let errorUserCallbacks = [];
let logoutUserCallbacks = [];
let isLogin = false;

export const loginUser = (loginData) => {
    startLoginCallbacks.forEach(start => { start(); });

    return api.post('users', loginData)
        .then(res => {
            if (!res.error) {
                localStorage.setItem('user', JSON.stringify(res));
                loginUserCallbacks.forEach(login => { login(res); });
            } else {
                errorUserCallbacks.forEach(errorCallback => { errorCallback(res.error); });
            }

            return res;
        });
};

class Auth extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        let user = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        }

        this.state = {
            user: user,
            loading: false
        };
    }
    componentDidMount() {
        let self = this;

        startLoginCallbacks.push(() => {
            self.setState({
                loading: true
            });
        });

        loginUserCallbacks.push((user) => {
            self.setState({
                user: user,
                loading: false
            });
        });
        errorUserCallbacks.push((error) => {
            self.setState({
                errorMsg: error.msg,
                loading: false
            });
            setTimeout(() => {
                self.setState({errorMsg: null});
            }, 2000);
        });
        logoutUserCallbacks.push(() => {
            localStorage.removeItem('user');
            self.setState({
                user: null,
                loading: false
            });
        });

        this.vkLogin.call(this);
        this.fbLogin.call(this);
    }
    fbLogin() {
        const self = this;
        const query = self.props.location.query;

        if (!isLogin && !self.state.user && query.code && query.fb) {
            isLogin = true;
            loginUser({
                soc: 'fb',
                code: query.code,
                redirect_uri: self.getCurrentURL(self.props.location, {fb: 1})
            });
        }
    }
    vkLogin() {
        const self = this;
        const query = self.props.location.query;

        if (!isLogin && !self.state.user && query.code && query.vk) {
            isLogin = true;
            loginUser({
                soc: 'vk',
                code: query.code,
                redirect_uri: self.getCurrentURL(self.props.location, {vk: 1})
            });
        }
    }
    logout() {
        logoutUserCallbacks.forEach(logout => { logout(); });
        this.context.router.push('/');
    }
    getCurrentURL(location, data) {
        let current = `http://82.146.36.41`;
        const query = location.query;
        let key;
        let newQuery = data || {};

        if (location.pathname[0] === '/') {
            current = `${current}${location.pathname}`
        } else {
            current = `${current}/${location.pathname}`
        }

        for (key in query) {
            if (query.hasOwnProperty(key) && key !== 'code') {
                newQuery[key] = query[key];
            }
        }

        current = `${current}?${queryString.stringify(newQuery)}`;

        return encodeURIComponent(current);
    }
    render() {
        const p_ = this.props;
        const s_ = this.state;

        return (
            <Layout
                loading={s_.loading}
                className={`${grid.w100} ${text.center} ${grid.pMicro} ${item.rounded} ${item.overNone}`}
            >
                {!s_.user &&
                    <div>
                        {(() => {
                            if (s_.errorMsg) {
                                return (
                                    <div className={auth.loginItem}>
                                        {s_.errorMsg}
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <div className={`${grid.row} ${grid.justify} ${grid.w100} ${grid.mbMicro}`}>
                                            <Link
                                                href={`https://www.facebook.com/v2.8/dialog/oauth?client_id=1682950858688158&redirect_uri=${this.getCurrentURL(p_.location, {fb: 1})}`}
                                                className={auth.item}
                                            >
                                                <FacebookIcon size={50} round={true} iconBgStyle={{fill: css.colors.main}} />
                                            </Link>
                                            <Link to="/login" className={auth.loginIcon}>
                                                <AccountCircle size={50} />
                                            </Link>
                                            <Link
                                                href={`https://oauth.vk.com/authorize?client_id=5691468&display=page&redirect_uri=${this.getCurrentURL(p_.location, {vk: 1})}&response_type=code`}
                                                className={auth.item}
                                            >
                                                <VKIcon size={50} round={true} iconBgStyle={{fill: css.colors.main}} />
                                            </Link>
                                        </div>
                                        <div className={`${text.mini} ${text.underline}`}>
                                            <Link to="/login">Войти</Link>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                }
                {s_.user &&
                    <div>
                        <div className={grid.mbMicro}>
                            <div className={auth.loginItem}>
                                {s_.user.name}
                            </div>
                        </div>
                        <div
                            onClick={() => this.logout()}
                            className={`${text.mini} ${text.underline} ${item.pointer}`}
                        >
                            <L10n k="exit" />
                        </div>
                    </div>
                }
            </Layout>
        );
    }
}
Auth.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Auth;