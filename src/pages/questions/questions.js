import React from 'react';
import Login from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import api from 'blocks/api/api';
import L10n from 'blocks/l10n/l10n';

import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import questions from './questions.css';

class Questions extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            question: '',
            loading: false,
            items: [
                {question: 'Что собой представляет готовый проект дома?', answer: 'Готовый проект дома (типовой, многоразовый и т.п.) - это уже созданный проект, решения которого ориентированы на потребности большинства.'},
                {question: 'Мне хотелось бы внести в проект некоторые изменения. Сколько это будет стоить?', answer: 'Хороший вопрос. Поскольку все проекты домов отличаются друг от друга (как и просьбы о внесении изменений), заранее цену установить весьма трудно.'},
                {question: 'Доставка проекта', answer: 'Большая часть наших проектов доставляется в течение 5 - 8 рабочих дней с момента получения заказа. Проект дома может быть отправлен по почте заказным письмом или курьерской службой.'}
            ]
        };
    }
    onChangeQuestion(value) {
        this.setState({question: value})
    }
    sendQuestion(user) {
        const self = this;
        const s_ = this.state;
        
        self.setState({loading: true});
        api.post('questions', {user: user, question: s_.question})
            .then(() => {
                self.setState({
                    question: '', 
                    msg: 'Вы успешно задали вопрос, мы обязательно на него ответим.',
                    loading: false
                });
                
                setTimeout(() => {self.setState({msg: ''})}, 1500);
            });
    }
    onResponseAuth(response) {
        if (!response.error) {
            this.setState({user: response});
        }

        this.setState({loading: false});
    }
    onResponseRegistration() {
        this.setState({loading: false});
    }
    render() {
        const s_ = this.state;
        let user = localStorage.getItem('user');
        if (user) {user = JSON.parse(user);}
        const isAdmin = localStorage.getItem('isAdmin');
        
        return (
            <div className={page.content}>
                <Layout loading={s_.loading}>
                    {s_.msg}
                    <div className={grid.mbMini}>
                        <Textarea 
                            placeholder={L10n('questions.yourQuestion')}
                            value={s_.question}
                            onChange={(value) => this.onChangeQuestion(value)}
                        />
                    </div>
                    {!user &&
                    <Login
                        descr={`${L10n('questions.toAsk')},`}
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.onResponseRegistration(response)}
                    />
                    }
                    {user &&
                    <div className={text.center}>
                        <Button
                            disabled={!s_.question}
                            onClick={() => this.sendQuestion(user)}
                            className={grid.w100_mob}
                        >
                            {L10n('questions.ask')}
                        </Button>
                    </div>
                    }
                </Layout>

                {isAdmin &&
                <div className={`${text.center} ${grid.mtMini}`}>
                    <Link
                        className={grid.w100_mob}
                        to="/admin?type=questions"
                    >
                        <Button
                            className={grid.w100_mob}
                        >
                            Добавить ответ
                        </Button>
                    </Link>
                </div>
                }
                
                <div className={`${grid.hSeparator} ${grid.mtMini} ${grid.mbNormal}`}></div>

                {s_.items.map((item, index) => {
                    return (
                        <div key={`question_${index}`} className={questions.wrapper}>
                            <div className={questions.title}>
                                {item.question}
                            </div>

                            <div className={questions.text}>
                                {item.answer}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Questions;