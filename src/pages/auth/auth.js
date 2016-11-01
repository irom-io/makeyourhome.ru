import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import Layout from 'blocks/layout/layout';
import {loginUser} from 'blocks/auth/auth';
import {browserHistory} from 'react-router';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Auth extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            loading: false,
            login: '',
            password: '',
            errorMsg: null
        };
    }
    componentDidMount() {
        let user = localStorage.getItem('user');

        if (user) {
            browserHistory.push('/projects');
        }
    }
    onChangeLogin(value) {
        this.setState({login: value});
    }
    onChangePassword(value) {
        this.setState({password: value});
    }
    onSubmit(e) {
        let self = this;
        
        e.preventDefault();
        self.setState({loading: true});
        loginUser({login: this.state.login, password: this.state.password})
            .then(res => {
                if (res.error) {
                    self.setState({
                        errorMsg: res.error.msg,
                        loading: false
                    });
                } else {
                    browserHistory.push('/projects');
                }
            });
    }
    render() {
        const s_ = this.state;

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
                className={`${grid.col} ${grid.center} ${grid.normalCenter}`}
            >
                <form onSubmit={(e) => this.onSubmit(e)} className={`${grid.w65} ${grid.w100_tabMini}`}>
                    <div className={`${grid.mbMini} ${text.colored} ${text.normal}`}>
                        Авторизуйтесь или зарегистрируйтесь
                    </div>
                    {s_.errorMsg &&
                        <div className={grid.mbMini}>
                            {s_.errorMsg}
                        </div>
                    }
                    <div className={grid.mbMini}>
                        <Input
                            placeholder="E-mail"
                            value={s_.login}
                            onChange={(value) => this.onChangeLogin(value)}
                        />
                    </div>
                    <div className={grid.mbMini}>
                        <Input
                            placeholder="Пароль"
                            value={s_.password}
                            type="password"
                            onChange={(value) => this.onChangePassword(value)}
                        />
                    </div>
                    <div className={text.right}>
                        <Button
                            type="submit"
                            disabled={s_.loading}
                        >
                            Отправить
                        </Button>
                    </div>
                </form>
            </Layout>
        );
    }
}

export default Auth;