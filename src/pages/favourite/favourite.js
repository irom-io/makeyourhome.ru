import React from 'react';
import Layout from 'blocks/layout/layout';
//import {getLang} from 'blocks/page/__lang/page__lang';
//import api from 'blocks/api/api';

class Favourite extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            loading: true
        };
    }
    componentDidMount() {
//        const self = this;

/*        api.get('posts')
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
            });*/
    }
    render() {
        const s_ = this.state;
        let user = localStorage.getItem('user');
        if (user) {user = JSON.parse(user);}
        //const lang = getLang();

        return (
            <Layout
                loading={s_.loading}
                isPage={true}
            >

            </Layout>
        );
    }
}
Favourite.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Favourite;