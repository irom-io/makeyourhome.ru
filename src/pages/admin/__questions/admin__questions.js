import React from 'react';
import {Input, Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';

import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

class AdminQuestions extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            errorMsg: null,
            loading: false,
            data: {
                ru: {answer: '', question: ''},
                en: {answer: '', question: ''},
                esp: {answer: '', question: ''}
            },
            questionId: p_.questionId || null
        };
    }
    componentDidMount() {
        const self = this;

        api.get('questions')
            .then((response) => {
                self.props.onLoad();

                if (response && self.state.questionId) {
                    response.forEach((question) => {
                        if (question.id === self.state.questionId) {
                            self.setState({data: question});
                        }
                    })
                }
            });
    }
    onChange(value, field) {
        const lang = getLang();
        let data = this.state.data;
        data[lang][field] = value;
        
        this.setState({data: data});
    }
    addNew() {
        this.setState({
            data: {
                ru: {answer: '', question: ''},
                en: {answer: '', question: ''},
                esp: {answer: '', question: ''}
            },
            errorMsg: null,
            loading: false,
            questionId: null
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const s_ = this.state;
        const p_ = this.props;
        const self = this;
        const lang = getLang();
        let user = localStorage.getItem('user');

        if (user) {
            user = JSON.parse(user)
        } else {
            user = {};
        }

        self.setState({msg: null, errorMsg: null, loading: true});
        p_.onSubmit();
        api.post('questions/add', {
            user: user,
            answer: s_.data[lang].answer,
            question: s_.data[lang].question,
            questionId: s_.questionId,
            lang: lang
        })
        .then((response) => {
            p_.onResponse(response);
            if (!response.error) {
                self.setState({
                    msg: 'Успешно сохранено',
                    loading: false,
                    questionId: response.questionId
                });
                setTimeout(() => {
                    self.setState({
                        msg: null
                    });
                }, 2500);
            } else {
                self.setState({
                    errorMsg: response.error.msg,
                    loading: false
                });
            }
        });
    }
    render() {
        const s_ = this.state;
        const lang = getLang();

        return (
            <form className={grid.w100} onSubmit={(e) => this.onSubmit(e)}>
                <div
                    onClick={() => this.addNew()}
                    className={`${grid.mbMini} ${text.md} ${text.underline} ${item.pointer}`}
                >
                    Добавить новый ответ
                </div>
                {s_.questionId &&
                    <div
                        className={`${grid.mbMini} ${text.md}`}
                    >
                        Редактировать ответ в {lang}
                    </div>
                }
                {s_.errorMsg &&
                <div className={grid.mbMini}>
                    {s_.errorMsg}
                </div>
                }
                {s_.msg &&
                <div className={grid.mbMini}>
                    {s_.msg}
                </div>
                }
                <div className={grid.mbMini}>
                    <Input
                        placeholder="Вопрос"
                        value={s_.data[lang].question}
                        onChange={(value) => this.onChange(value, 'question')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Textarea
                        placeholder="Ответ"
                        value={s_.data[lang].answer}
                        onChange={(value) => this.onChange(value, 'answer')}
                    />
                </div>
                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading || !s_.data[lang].answer || !s_.data[lang].question}
                    >
                        Сохранить {lang}
                    </Button>
                </div>
            </form>
        );
    }
}
AdminQuestions.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminQuestions;