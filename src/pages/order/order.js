import React from 'react';
import Login from 'blocks/login/login';
import Layout from 'blocks/layout/layout';
import {Textarea} from 'blocks/text/_edit/text_edit';
import Button from 'blocks/button/button';
import {getUser} from 'blocks/auth/auth';
import api from 'blocks/api/api';
import L10n from 'blocks/l10n/l10n';

import grid from 'blocks/grid/grid.css';
import text from 'blocks/text/text.css';

class Order extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            order: '',
            loading: false
        };
    }
    onChangeOrder(value) {
        this.setState({order: value})
    }
    sendOrder(user) {
        const self = this;
        const s_ = this.state;
        
        self.setState({loading: true});
        api.post('projects/individualOrder', {user: user, order: s_.order})
            .then(() => {
                self.setState({
                    order: '',
                    msg: L10n('project.changeSuccess'),
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
        const user = getUser();
        
        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                <div>
                    <div className={grid.mbMini}>
                        {s_.msg}
                    </div>
                    <div className={`${grid.mbMini} ${text.preWrap}`}>
                        {L10n('project.changeText')}
                    </div>
                    <div className={grid.mbMini}>
                        <Textarea
                            rows={15}
                            placeholder={L10n('project.yourOrder')}
                            value={s_.order}
                            onChange={(value) => this.onChangeOrder(value)}
                        />
                    </div>
                    {!user &&
                    <Login
                        descr={`${L10n('project.toChange')},`}
                        onSubmit={() => {this.setState({loading: true})}}
                        onResponseAuth={(response) => this.onResponseAuth(response)}
                        onResponseRegistration={(response) => this.onResponseRegistration(response)}
                    />
                    }
                    {user &&
                    <div className={text.center}>
                        <Button
                            disabled={!s_.order}
                            onClick={() => this.sendOrder(user)}
                            className={grid.w100_mob}
                        >
                            {L10n('project.change')}
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