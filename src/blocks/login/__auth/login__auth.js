import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {loginUser} from 'blocks/auth/auth';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class LoginAuth extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            login: '',
            password: '',
            loading: false
        };
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    onSubmit(e) {
        let self = this;

        e.preventDefault();
        self.props.onSubmit();
        self.setState({loading: true});
        loginUser({login: self.state.login, password: self.state.password})
            .then(res => {
                self.props.onResponse(res);

                if (res.error) {
                    self.setState({loading: false}); // Иначе возникает ошибка при редиректе после логина
                }
            });
    }
    render() {
        const s_ = this.state;

        return (
            <form className={grid.w100} onSubmit={(e) => this.onSubmit(e)}>
                <div className={grid.mbMini}>
                    <Input
                        placeholder="E-mail"
                        value={s_.login}
                        onChange={(value) => this.onChange(value, 'login')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Input
                        placeholder="Пароль"
                        value={s_.password}
                        type="password"
                        onChange={(value) => this.onChange(value, 'password')}
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
        );
    }
}

export default LoginAuth;