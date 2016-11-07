import React from 'react';
import {Input} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class AdminQuestions extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            question: ''
        };
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    onSubmit(e) {
        let self = this;

        e.preventDefault();
        console.log(self.state);
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
                <div className={text.right}>
                    <Button
                        type="submit"
                        disabled={s_.loading}
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