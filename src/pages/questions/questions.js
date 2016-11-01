import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import page from 'blocks/page/page.css';
import text from 'blocks/text/text.css';
import grid from 'blocks/grid/grid.css';
import questions from './questions.css';

class Questions extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {question: 'Что собой представляет готовый проект дома?', answer: 'Готовый проект дома (типовой, многоразовый и т.п.) - это уже созданный проект, решения которого ориентированы на потребности большинства.'},
                {question: 'Мне хотелось бы внести в проект некоторые изменения. Сколько это будет стоить?', answer: 'Хороший вопрос. Поскольку все проекты домов отличаются друг от друга (как и просьбы о внесении изменений), заранее цену установить весьма трудно.'},
                {question: 'Доставка проекта', answer: 'Большая часть наших проектов доставляется в течение 5 - 8 рабочих дней с момента получения заказа. Проект дома может быть отправлен по почте заказным письмом или курьерской службой.'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={page.content}>
                <form>
                    <div className={grid.mbMini}>
                        <Input placeholder="Имя" />
                    </div>
                    <div className={grid.mbMini}>
                        <Input placeholder="E-mail" />
                    </div>
                    <div className={grid.mbMini}>
                        <Textarea placeholder="Ваш вопрос" />
                    </div>
                    <div className={text.center}>
                        <Button className={grid.w100_mob} type="submit">Задать вопрос</Button>
                    </div>
                </form>

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