import React from 'react';
import {Input, Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class AdminQuestions extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            errorMsg: null,
            loading: false,
            question: '',
            answer: '',
            questionId: null
        };
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    onSubmit(e) {
        e.preventDefault();
        const s_ = this.state;
        const p_ = this.props;
        const self = this;
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
            answer: s_.answer,
            question: s_.question,
            questionId: s_.questionId,
            lang: getLang()
        })
        .then((response) => {
            p_.onResponse(response);
            if (!response.error) {
                self.setState({
                    msg: 'Сохранено успешно',
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
                <div className={`${grid.mbMini} ${text.md}`}>
                    Добавить ответ
                </div>
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
                        value={s_.question}
                        onChange={(value) => this.onChange(value, 'question')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Textarea
                        placeholder="Ответ"
                        value={s_.answer}
                        onChange={(value) => this.onChange(value, 'answer')}
                    />
                </div>
                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading || !s_.question || !s_.answer}
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