import React from 'react';
import {Input, Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import L10n from 'blocks/l10n/l10n';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class AdminQuestions extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false,
            question: '',
            answer: ''
        };
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    onSubmit(e) {
        e.preventDefault();

        let self = this;
        const s_ = self.state;
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user)
        } else {
            user = {};
        }

        api.post('questions/add', {
            user: user,
            answer: s_.answer,
            question: s_.question,
            lang: getLang()
        })
        .then((response) => {

        });
    }
    render() {
        const s_ = this.state;

        return (
            <form className={grid.w100} onSubmit={(e) => this.onSubmit(e)}>
                <div className={grid.mbMini}>
                    <Input
                        placeholder={L10n('admin.question')}
                        value={s_.question}
                        onChange={(value) => this.onChange(value, 'question')}
                    />
                </div>
                <div className={grid.mbMini}>
                    <Textarea
                        placeholder={L10n('admin.answer')}
                        value={s_.answer}
                        onChange={(value) => this.onChange(value, 'answer')}
                    />
                </div>
                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading || !s_.question || !s_.answer}
                    >
                        {L10n('admin.save')}
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