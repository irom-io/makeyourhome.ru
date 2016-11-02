import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import Layout from 'blocks/layout/layout';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Registration extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {}
    }
    onSubmit(e) {}
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
                        Регистрация
                    </div>
                    {s_.errorMsg &&
                        <div className={grid.mbMini}>
                            {s_.errorMsg}
                        </div>
                    }
                    <div className={grid.mbMini}>
                        <Input
                            placeholder="Имя"
                            value={s_.name}
                            onChange={(value) => this.onChangeLogin(value)}
                        />
                    </div>
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
                    <div className={grid.mbMini}>
                        <Input
                            placeholder="Повторите пароль"
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

export default Registration;