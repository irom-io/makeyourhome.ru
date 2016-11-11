import React from 'react';
import Layout from 'blocks/layout/layout';
import Login from 'blocks/login/login';
import {getUser} from 'blocks/auth/auth';
import L10n from 'blocks/l10n/l10n';
//import {getLang} from 'blocks/page/__lang/page__lang';
import api from 'blocks/api/api';

class Favourite extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: false,
            items: []
        };
        this.loadFave = this.loadFave.bind(this);
    }
    componentDidMount() {
        const user = getUser();

        if (user) {
            this.loadFave(user);
        }
    }
    onResponseAuth(response) {
        if (!response.error) {
            this.loadFave(response);
        } else {
            this.setState({loading: false});
        }
    }
    loadFave(user) {
        const self = this;

        self.setState({loading: true});
        api.post('favourite/view', {user: user})
            .then((response) => {
                if (!response.error) {
                    self.setState({
                        items: response,
                        loading: false
                    });
                    console.log(response);
                } else {
                    self.setState({loading: false});
                }
            });
    }
    render() {
        const s_ = this.state;
        const user = getUser();

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >
                {!user &&
                <Login
                    descr={`${L10n('toFave')},`}
                    onSubmit={() => {this.setState({loading: true})}}
                    onResponseAuth={(response) => this.onResponseAuth(response)}
                    onResponseRegistration={() => {this.setState({loading: false})}}
                />
                }
            </Layout>
        );
    }
}
Favourite.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Favourite;