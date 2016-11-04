import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import api from 'blocks/api/api';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class LoginRegistration extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            loading: false,
            name: '',
            login: '',
            password: '',
            passwordRepeat: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        const self = this;

        self.props.onSubmit();
        self.setState({loading: true});
        api.post('users/registration', this.state)
            .then(res => {
                self.props.onResponse(res);

                if (res.error) {
                    self.setState({loading: false}); // Иначе возникает ошибка при редиректе после логина
                }
            });
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    render() {
        const s_ = this.state;

        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <div className={grid.mbMini}>
                    <Input
                        placeholder={L10n('auth.name')}
                        value={s_.name}
                        onChange={(value) => this.onChange(value, 'name')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Input
                        placeholder={L10n('auth.email')}
                        value={s_.login}
                        onChange={(value) => this.onChange(value, 'login')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Input
                        placeholder={L10n('auth.password')}
                        value={s_.password}
                        type="password"
                        onChange={(value) => this.onChange(value, 'password')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Input
                        placeholder={L10n('auth.passwordConfirm')}
                        value={s_.passwordRepeat}
                        type="password"
                        onChange={(value) => this.onChange(value, 'passwordRepeat')}
                    />
                </div>
                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading}
                    >
                        {L10n('login')}
                    </Button>
                </div>
            </form>
        );
    }
}

export default LoginRegistration;