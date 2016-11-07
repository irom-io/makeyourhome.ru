import React from 'react';
import Login from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import Link from 'blocks/link/link';
import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';
import L10n from 'blocks/l10n/l10n';
import AdminEdit from 'blocks/admin/__edit/admin__edit';

import page from 'blocks/page/page.css';
import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';
import questions from './questions.css';

const step = 3;
class Questions extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            question: '',
            loading: true,
            items: null,
            visibleItems: step
        };
    }
    componentDidMount() {
        const self = this;

        api.get('questions')
            .then((response) => {
                if (!response.error) {
                    self.setState({
                        items: response,
                        loading: false
                    });
                } else {
                    self.setState({loading: false});
                }
            });
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
    seeMore() {
        this.setState({visibleItems: (this.state.visibleItems + step)})
    }
    deleteQuestion(user, questionId) {
        const self = this;

        self.setState({loading: true});
        api.delete('questions', {user: user, questionId: questionId})
            .then((response) => {
                if (response && !response.error) {
                    self.setState({items: response, loading: false});
                }
            });
    }
    render() {
        const s_ = this.state;
        let user = localStorage.getItem('user');
        if (user) {user = JSON.parse(user);}
        const isAdmin = localStorage.getItem('isAdmin');
        const lang = getLang();
        
        return (
            <Layout
                loading={s_.loading}
                isPage={true}
                className={page.content}
            >
                <div>
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
                </div>

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

                {s_.items &&
                <div>
                    {
                        s_.items.map((item, index) => {
                            if (index < s_.visibleItems) {
                                return (
                                    <div key={`question_${index}`} className={questions.wrapper}>
                                        <div className={questions.title}>
                                            {item[lang].question}
                                        </div>

                                        <div className={questions.text}>
                                            {item[lang].answer}
                                        </div>

                                        {isAdmin &&
                                        <AdminEdit
                                            editTo={`/admin?type=questions&questionId=${item.id}`}
                                            onDelete={() => this.deleteQuestion(user, item.id)}
                                        />
                                        }
                                    </div>
                                )
                            } else {
                                return '';
                            }
                        })
                    }
                </div>
                }

                {s_.items && (s_.visibleItems < s_.items.length) &&
                <div className={`${text.center} ${grid.mtMini}`}>
                    <Button
                        onClick={() => this.seeMore()}
                        className={grid.w100_mob}
                    >
                        {L10n('more')}
                    </Button>
                </div>
                }
            </Layout>
        );
    }
}
Questions.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Questions;