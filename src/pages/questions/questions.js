import React from 'react';
import Login from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';

import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import questions from './questions.css';

class Questions extends React.Component {
    constructor(p_) {
        super(p_);

        const user = localStorage.getItem('user');

        this.state = {
            question: '',
            user: user,
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
    sendQuestion() {
        //console.log(this.state.question);
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

        return (
            <div className={page.content}>
                <Layout loading={s_.loading}>
                    <div className={grid.mbMini}>
                        <Textarea 
                            placeholder="Ваш вопрос"
                            value={s_.question}
                            onChange={(value) => this.onChangeQuestion(value)}
                        />
                    </div>
                    {!s_.user &&
                    <Login
                        descr="Чтобы задать вопрос,"
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.onResponseRegistration(response)}
                    />
                    }
                    {s_.user &&
                    <div className={text.center}>
                        <Button
                            onClick={() => this.sendQuestion()}
                            className={grid.w100_mob}
                        >
                            Задать вопрос
                        </Button>
                    </div>
                    }
                </Layout>

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