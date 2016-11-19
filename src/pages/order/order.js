import React from 'react';
import Login from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';
import L10n from 'blocks/l10n/l10n';
import TextPhone from 'blocks/text/_phone/text_phone';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Order extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            text: '',
            phone: '',
            loading: false
        };
    }
    onChange(value, field) {
        this.setState({[field]: value})
    }
    send(user) {
        const self = this;
        const s_ = this.state;
        const p_ = this.props;

        self.setState({loading: true});
        api.post('projects/individualOrder', {user: user, text: s_.text, phone: s_.phone, projectId: p_.location.query.projectId})
            .then(() => {
                self.setState({
                    msg: L10n('project.changeSuccess'),
                    loading: false
                });
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
        const p_ = this.props;
        const s_ = this.state;
        const user = getUser();
        const placeholder = (p_.location.query.projectId) ? L10n('project.yourOrder') : L10n('project.yourIdea');

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                <div>
                    <div className={`${grid.mbMini} ${text.colored}`}>
                        {s_.msg}
                    </div>
                    <div className={`${grid.mbMini} ${text.preWrap}`}>
                        {(() => {
                            if (p_.location.query.projectId) {
                                return L10n('project.changeText');
                            }
                            else {
                                return L10n('project.individualText');
                            }
                        })()}
                    </div>
                    <div className={grid.mbMini}>
                        <Textarea
                            rows={15}
                            placeholder={placeholder}
                            value={s_.text}
                            onChange={(value) => this.onChange(value, 'text')}
                        />
                    </div>

                    <div className={grid.mbMini}>
                        <TextPhone
                            onChange={(value) => this.onChange(value, 'phone')}
                        />
                    </div>
                    {!user &&
                    <Login
                        descr={`${L10n('project.toSend')},`}
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.onResponseRegistration(response)}
                    />
                    }
                    {user &&
                    <div className={text.center}>
                        <Button
                            disabled={(!s_.text || !s_.phone)}
                            onClick={() => this.send(user)}
                            className={grid.w100_mob}
                        >
                            {L10n('project.send')}
                        </Button>
                    </div>
                    }
                </div>
            </Layout>
        );
    }
}
Order.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Order;